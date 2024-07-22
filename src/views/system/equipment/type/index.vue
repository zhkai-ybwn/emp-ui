<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.system', '设备管理', '设备类别']" />
    <a-card class="general-card" :title="'设备类别'">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-show="showQuery" class="header-query">
          <a-form ref="queryRef" :model="queryParams" layout="inline">
            <a-form-item field="name" hide-label>
              <a-input
                v-model="queryParams.deviceTypeName"
                placeholder="输入关键字搜索"
                allow-clear
                style="width: 220px"
                @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item hide-label>
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <template #icon><icon-search /></template>查询
                </a-button>
                <a-button @click="resetQuery">
                  <template #icon><icon-refresh /></template>重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <!-- 操作栏 -->
        <div class="header-operation">
          <a-row>
            <a-col :span="12">
              <a-space>
                <a-button
                  v-permission="['system:equipment:type:add']"
                  type="primary"
                  @click="toAdd"
                >
                  <template #icon><icon-plus /></template>新增
                </a-button>
                <a-button
                  v-permission="['system:equipment:type:update']"
                  type="primary"
                  status="success"
                  :disabled="single"
                  :title="single ? '请选择一条要修改的数据' : ''"
                  @click="toUpdate(ids[0])"
                >
                  <template #icon><icon-edit /></template>修改
                </a-button>
                <a-button
                  v-permission="['system:equipment:type:delete']"
                  type="primary"
                  status="danger"
                  :disabled="multiple"
                  :title="multiple ? '请选择要删除的数据' : ''"
                  @click="handleBatchDelete"
                >
                  <template #icon><icon-delete /></template>删除
                </a-button>
                <a-button
                  v-if="false"
                  v-permission="['system:equipment:type:export']"
                  :loading="exportLoading"
                  type="primary"
                  status="warning"
                  @click="handleExport"
                >
                  <template #icon><icon-download /></template>导出
                </a-button>
              </a-space>
            </a-col>
            <a-col :span="12">
              <right-toolbar
                v-model:show-query="showQuery"
                @refresh="getList"
              />
            </a-col>
          </a-row>
        </div>
      </div>

      <!-- 列表区域 -->
      <a-table
        ref="tableRef"
        row-key="id"
        :data="dataList"
        :loading="loading"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false,
        }"
        :pagination="false"
        :bordered="false"
        :default-expand-all-rows="true"
        :hide-expand-button-on-empty="true"
        column-resizable
        stripe
        size="large"
        @select="handleSelect"
        @selection-change="handleSelectionChange"
      >
        <template #columns>
          <a-table-column title="设备类别名称">
            <template #cell="{ record }">
              <a-link @click="toDetail(record.id)">{{
                record.deviceTypeName
              }}</a-link>
            </template>
          </a-table-column>
          <a-table-column
            title="设备类别编码"
            align="center"
            data-index="deviceTypeCode"
          />

          <a-table-column title="系统内置" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.bDefault" color="red">是</a-tag>
              <a-tag v-else color="arcoblue">否</a-tag>
            </template>
          </a-table-column>
          <a-table-column
            v-if="
              checkPermission([
                'system:equipment:type:update',
                'system:equipment:type:delete',
              ])
            "
            title="操作"
            align="center"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['system:equipment:type:update']"
                type="text"
                size="small"
                title="修改"
                @click="toUpdate(record.id)"
              >
                <!-- <template #icon><icon-edit /></template> -->
                修改
              </a-button>
              <a-popconfirm
                content="确定要删除当前选中的数据吗？"
                type="warning"
                @ok="handleDelete([record.id])"
              >
                <a-button
                  v-permission="['system:equipment:type:delete']"
                  type="text"
                  size="small"
                  :title="record.bDefault ? '系统内置数据不能删除' : '删除'"
                  :disabled="record.disabled"
                >
                  <!-- <template #icon><icon-delete /></template> -->
                  删除
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <!-- 表单区域 -->
      <a-modal
        :title="title"
        :visible="visible"
        :mask-closable="false"
        :esc-to-close="false"
        unmount-on-close
        render-to-body
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form
          ref="formRef"
          :model="form"
          :rules="rules"
          size="large"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
        >
          <a-form-item label="设备类别名称" field="deviceTypeName">
            <a-input v-model="form.deviceTypeName" placeholder="请输入内容" />
          </a-form-item>
          <a-form-item
            label="上级设备类别"
            field="parentId"
            :disabled="form.disabled"
          >
            <a-tree-select
              v-model="form.parentId"
              :data="treeData"
              placeholder="请选择"
              allow-clear
              allow-search
              :filter-tree-node="filterDeptTree"
              :fallback-option="false"
              :field-names="{
                key: 'id',
                title: 'deviceTypeName',
              }"
            />
          </a-form-item>
          <a-form-item label="设备类别编码" field="deviceTypeCode">
            <a-input
              v-model="form.deviceTypeCode"
              placeholder="请输入2-10位字母"
            />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 详情区域 -->
      <a-drawer
        title="设备类别详情"
        :visible="detailVisible"
        :width="580"
        :footer="false"
        unmount-on-close
        render-to-body
        @cancel="handleDetailCancel"
      >
        <div class="list">
          <div class="item1 item">
            <div class="title">设备类别名称</div>
            <div class="value">{{
              dataDetail.deviceTypeName ? dataDetail.deviceTypeName : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">上级设备类别</div>
            <div class="value">{{
              dataDetail.deviceTypeNameSeq ? dataDetail.deviceTypeNameSeq : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">设备类别编码</div>
            <div class="value">{{
              dataDetail.deviceTypeCode ? dataDetail.deviceTypeCode : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">系统内置</div>
            <div class="value">{{ dataDetail.bDefault ? '是' : '否' }}</div>
          </div>
          <div class="item1 item">
            <div class="title">创建人</div>
            <div class="value">{{
              dataDetail.createBy ? dataDetail.createBy : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">创建时间</div>
            <div class="value">{{
              dataDetail.createTime ? dataDetail.createTime : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">最近修改人</div>
            <div class="value">{{
              dataDetail.lastModifyBy ? dataDetail.lastModifyBy : '-'
            }}</div>
          </div>
          <div class="item1 item">
            <div class="title">最近修改时间</div>
            <div class="value">{{
              dataDetail.lastModifyTime ? dataDetail.lastModifyTime : '-'
            }}</div>
          </div>
        </div>
      </a-drawer>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { TreeNodeData, TableData } from '@arco-design/web-vue';
  import {
    DataRecord,
    ListParam,
    list,
    get,
    add,
    update,
    del,
  } from '@/api/system/type';
  import checkPermission from '@/utils/permission';

  const { proxy } = getCurrentInstance() as any;

  const dataList = ref<DataRecord[]>([]);
  const dataDetail = ref<DataRecord>({});
  const ids = ref<Array<number>>([]);
  const title = ref('');
  const single = ref(true);
  const multiple = ref(true);
  const showQuery = ref(true);
  const loading = ref(false);
  const detailLoading = ref(false);
  const exportLoading = ref(false);
  const visible = ref(false);
  const detailVisible = ref(false);
  const treeData = ref<TreeNodeData[]>();

  const data = reactive({
    // 查询参数
    queryParams: {
      deviceTypeName: undefined,
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    },
    // 表单数据
    form: {} as DataRecord,
    // 表单验证规则
    rules: {
      parentId: [{ required: true, message: '请选择上级设备类别' }],
      deviceTypeName: [
        { required: true, message: '请输入设备类别名称' },
        {
          match: /^[\u4e00-\u9fa5a-zA-Z0-9_]{0,15}$/,
          message: '最长15字符，可以包含中文、英文、字母、数字',
        },
      ],
      deviceTypeCode: [
        { required: true, message: '请输入设备类别编码' },
        {
          match: /^[A-Za-z]{2,10}$/,
          message: '请输入2-10位字母',
        },
      ],
    },
  });
  const { queryParams, form, rules } = toRefs(data);

  /**
   * 查询列表
   *
   * @param params 查询参数
   */
  const getList = (params: ListParam = { ...queryParams.value }) => {
    loading.value = true;
    list(params)
      .then((res) => {
        dataList.value = res.data;
        setTimeout(() => {
          proxy.$refs.tableRef.expandAll();
        }, 0);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  getList();

  /**
   * 打开新增对话框
   */
  const toAdd = () => {
    reset();
    list({
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    }).then((res) => {
      treeData.value = res.data;
    });
    title.value = '新增设备类别';
    visible.value = true;
  };

  const addDisabledProperty = (data: any, parentId: any) => {
    const traverse = (node: any) => {
      if (node.key === parentId) {
        node.disabled = true;
        if (node.children) {
          node.children.forEach((child: any) => {
            child.disabled = true;
            traverse(child);
          });
        }
      } else if (node.children) {
        node.children.forEach(traverse);
      }
    };

    data.forEach(traverse);
    return data;
  };

  /**
   * 打开修改对话框
   *
   * @param id ID
   */
  const toUpdate = (id: number) => {
    reset();
    list({
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    }).then((res) => {
      treeData.value = addDisabledProperty(res.data, id);
    });

    get(id).then((res) => {
      form.value = res.data;
      title.value = '修改设备类别';
      visible.value = true;
    });
  };

  /**
   * 重置表单
   */
  const reset = () => {
    form.value = {};
    proxy.$refs.formRef?.resetFields();
  };

  /**
   * 取消
   */
  const handleCancel = () => {
    visible.value = false;
    proxy.$refs.formRef.resetFields();
  };

  /**
   * 确定
   */
  const handleOk = () => {
    proxy.$refs.formRef.validate((valid: any) => {
      if (!valid) {
        if (form.value.id !== undefined) {
          update(form.value, form.value.id).then((res) => {
            handleCancel();
            getList();
            proxy.$message.success(res.message);
          });
        } else {
          add(form.value).then((res) => {
            handleCancel();
            getList();
            proxy.$message.success(res.message);
          });
        }
      }
    });
  };

  /**
   * 查看详情
   *
   * @param id ID
   */
  const toDetail = async (id: number) => {
    if (detailLoading.value) return;
    detailLoading.value = true;
    detailVisible.value = true;
    get(id)
      .then((res) => {
        dataDetail.value = res.data;
      })
      .finally(() => {
        detailLoading.value = false;
      });
  };

  /**
   * 关闭详情
   */
  const handleDetailCancel = () => {
    detailVisible.value = false;
  };

  /**
   * 批量删除
   */
  const handleBatchDelete = () => {
    if (ids.value.length === 0) {
      proxy.$message.info('请选择要删除的数据');
    } else {
      proxy.$modal.warning({
        title: '警告',
        titleAlign: 'start',
        content: '确定要删除当前选中的数据吗？',
        hideCancel: false,
        onOk: () => {
          handleDelete(ids.value);
        },
      });
    }
  };

  /**
   * 删除
   *
   * @param ids ID 列表
   */
  const handleDelete = (ids: Array<number>) => {
    del(ids).then((res) => {
      proxy.$message.success(res.message);
      getList();
      proxy.$refs.tableRef.selectAll(false);
    });
  };

  /**
   * 点击行选择器
   */
  const handleSelect = (rowKeys: any, rowKey: any, record: TableData) => {
    if (rowKeys.find((key: any) => key === rowKey)) {
      if (record.children) {
        record.children.forEach((r) => {
          proxy.$refs.tableRef.select(r.id);
          rowKeys.push(r.id);
          if (r.children) {
            handleSelect(rowKeys, rowKey, r);
          }
        });
      }
    } else if (record.children) {
      record.children.forEach((r) => {
        rowKeys.splice(
          rowKeys.findIndex((key: number | undefined) => key === r.id),
          1
        );
        proxy.$refs.tableRef.select(r.id, false);
        if (r.children) {
          handleSelect(rowKeys, rowKey, r);
        }
      });
    }
  };

  /**
   * 已选择的数据行发生改变
   *
   * @param rowKeys ID 列表
   */
  const handleSelectionChange = (rowKeys: Array<any>) => {
    ids.value = rowKeys;
    single.value = rowKeys.length !== 1;
    multiple.value = !rowKeys.length;
  };

  /**
   * 导出
   */
  const handleExport = () => {
    if (exportLoading.value) return;
    exportLoading.value = true;
    proxy
      .download('/system/type/export', { ...queryParams.value }, '设备类别数据')
      .finally(() => {
        exportLoading.value = false;
      });
  };

  /**
   * 过滤设备类别树
   *
   * @param searchValue 搜索值
   * @param nodeData 节点值
   */
  const filterDeptTree = (searchValue: string, nodeData: TreeNodeData) => {
    if (nodeData.title) {
      return (
        nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      );
    }
    return false;
  };

  /**
   * 查询
   */
  const handleQuery = () => {
    getList();
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    queryParams.value.deviceTypeName = undefined;
    proxy.$refs.queryRef.resetFields();
    handleQuery();
  };
</script>

<script lang="ts">
  export default {
    name: 'Type',
  };
</script>

<style scoped lang="less">
  .list {
    .item {
      display: flex;
      margin: 21px 0;
      font-family: HarmonyOS-Regular, sans-serif;

      .title {
        width: 90px;
        color: #4e5969;
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
        line-height: 24px;
        text-align: right;
      }

      .value {
        margin-left: 27px;
        color: rgb(0 0 0 / 85%);
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
        line-height: 24px;
        text-align: left;
      }
    }
  }
</style>
1
