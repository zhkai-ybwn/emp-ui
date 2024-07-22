<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.system', '空间管理']" />
    <a-card class="general-card" :title="'空间管理'">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-show="showQuery" class="header-query">
          <a-form ref="queryRef" :model="queryParams" layout="inline">
            <a-form-item field="name" hide-label>
              <a-input
                v-model="queryParams.areaInfoName"
                placeholder="输入关键字搜索"
                allow-clear
                style="width: 150px"
                @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="status" hide-label>
              <a-select
                v-model="queryParams.areaInfoStatus"
                placeholder="状态"
                allow-clear
                style="width: 150px"
              >
                <a-option :value="1"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 5px;
                      background-color: #007aff;
                      border-radius: 100%;
                    "
                  ></span
                  >使用</a-option
                >
                <a-option :value="2"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 5px;
                      background-color: #00b42a;
                      border-radius: 100%;
                    "
                  ></span
                  >维护</a-option
                >
                <a-option :value="0"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 5px;
                      background-color: #fdad15;
                      border-radius: 100%;
                    "
                  ></span
                  >闲置</a-option
                >
              </a-select>
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
                  v-permission="['system:space:add']"
                  type="primary"
                  @click="toAdd"
                >
                  <template #icon><icon-plus /></template>新增
                </a-button>
                <a-button
                  v-permission="['system:space:update']"
                  type="primary"
                  status="success"
                  :disabled="single"
                  :title="single ? '请选择一条要修改的数据' : ''"
                  @click="toUpdate(ids[0])"
                >
                  <template #icon><icon-edit /></template>修改
                </a-button>
                <a-button
                  v-permission="['system:space:delete']"
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
                  v-permission="['system:space:export']"
                  :loading="exportLoading"
                  type="primary"
                  status="warning"
                  @click="handleExport"
                >
                  <template #icon><icon-download /></template>导出
                </a-button>
              </a-space>
            </a-col>
            <!-- <a-col :span="12">
              <right-toolbar
                v-model:show-query="showQuery"
                @refresh="getList"
              />
            </a-col> -->
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
          <a-table-column title="空间名称">
            <template #cell="{ record }">
              <a-link @click="toDetail(record.id)">{{
                record.areaInfoName
              }}</a-link>
            </template>
          </a-table-column>
          <a-table-column
            title="空间编码"
            align="center"
            data-index="areaInfoCode"
          />
          <a-table-column title="状态" align="center">
            <template #cell="{ record }">
              <div>
                <span
                  style="
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    margin-right: 4px;
                    border-radius: 50%;
                  "
                  :style="{ background: colorList[record.areaInfoStatus] }"
                ></span>
                {{ ['闲置', '使用', '维护'][record.areaInfoStatus] }}</div
              >
            </template>
          </a-table-column>
          <a-table-column
            title="描述"
            data-index="description"
            :tooltip="true"
            :ellipsis="true"
          />
          <a-table-column
            v-if="
              checkPermission(['system:space:update', 'system:space:delete'])
            "
            title="操作"
            align="center"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['system:space:update']"
                type="text"
                size="small"
                title="修改"
                @click="toUpdate(record.id)"
              >
                修改
              </a-button>
              <a-popconfirm
                content="确定要删除当前选中的空间吗？"
                type="warning"
                @ok="handleDelete([record.id])"
              >
                <a-button
                  v-permission="['system:space:delete']"
                  type="text"
                  size="small"
                  :title="record.isSystem ? '系统内置数据不能删除' : '删除'"
                  :disabled="record.disabled"
                >
                  删除
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <!-- 表单区域 -->
      <a-drawer
        :title="title"
        :visible="visible"
        :width="580"
        :mask-closable="false"
        :esc-to-close="false"
        unmount-on-close
        render-to-body
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <div class="add-box">
          <div class="info">基础信息</div>
          <a-form ref="formRef" :model="form" :rules="rules" size="large">
            <a-form-item label="空间名称" field="areaInfoName">
              <a-input v-model="form.areaInfoName" placeholder="请输入内容" />
            </a-form-item>
            <a-form-item label="上级空间" field="parentId">
              <a-tree-select
                v-model="form.parentId"
                :data="treeData"
                placeholder="请选择上级空间"
                allow-clear
                allow-search
                :filter-tree-node="filterDeptTree"
                :fallback-option="false"
                :field-names="{
                  key: 'id',
                  title: 'areaInfoName',
                }"
              />
            </a-form-item>

            <a-form-item label="空间编码" field="areaInfoCode">
              <a-input
                v-model="form.areaInfoCode"
                placeholder="请输入内容"
                :disabled="disable1"
              />
            </a-form-item>
            <a-form-item label="状态" field="areaInfoStatus">
              <a-select
                v-model="form.areaInfoStatus"
                placeholder="状态"
                allow-clear
              >
                <a-option :value="1"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 8px;
                      background-color: #007aff;
                      border-radius: 100%;
                    "
                  ></span
                  >使用</a-option
                >
                <a-option :value="2"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 8px;
                      background-color: #00b42a;
                      border-radius: 100%;
                    "
                  ></span
                  >维护</a-option
                >
                <a-option :value="0"
                  ><span
                    style="
                      display: inline-block;
                      width: 8px;
                      height: 8px;
                      margin-right: 8px;
                      background-color: #fdad15;
                      border-radius: 100%;
                    "
                  ></span
                  >闲置</a-option
                >
              </a-select>
            </a-form-item>
            <a-form-item label="区域面积" field="acreage">
              <a-input-number
                v-model="form.acreage"
                hide-button
                placeholder="请输入"
                style="width: 120px"
              />
              <span class="unit">m<sup>2</sup></span>
            </a-form-item>
            <a-form-item label="联系电话" field="telephone">
              <a-input v-model="form.telephone" placeholder="请输入内容" />
            </a-form-item>
            <a-form-item label="描述" field="description">
              <a-textarea
                v-model="form.description"
                :max-length="200"
                placeholder="请输入描述"
                :auto-size="{
                  minRows: 4,
                  maxRows: 12,
                }"
                show-word-limit
              />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>

      <!-- 详情区域 -->
      <a-drawer
        title="查看详情"
        :visible="detailVisible"
        :width="580"
        :footer="false"
        unmount-on-close
        render-to-body
        @cancel="handleDetailCancel"
      >
        <div class="base">
          <div class="top">
            <div class="title">基础信息</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div class="item1 item">
              <div class="title">空间名称</div>
              <div class="value">{{
                dataDetail.areaInfoName ? dataDetail.areaInfoName : '-'
              }}</div>
            </div>
            <div class="item2 item">
              <div class="title">上级空间</div>
              <div class="value">{{
                dataDetail.areaInfoNameSeq
                  ? dataDetail.areaInfoNameSeq.replace(/-[^-]*$/, '')
                  : '-'
              }}</div>
            </div>
            <div class="item3 item">
              <div class="title">空间编码</div>
              <div class="value">{{
                dataDetail.areaInfoCode ? dataDetail.areaInfoCode : '-'
              }}</div>
            </div>
            <div class="item4 item">
              <div class="title">状态</div>
              <div class="value">
                <div
                  v-if="
                    dataDetail.areaInfoStatus || dataDetail.areaInfoStatus === 0
                  "
                >
                  <span
                    style="
                      display: inline-block;
                      width: 6px;
                      height: 6px;
                      margin-right: 4px;
                      border-radius: 50%;
                    "
                    :style="{
                      background: colorList[dataDetail.areaInfoStatus],
                    }"
                  ></span>
                  {{ ['闲置', '使用', '维护'][dataDetail.areaInfoStatus] }}
                </div>
                <div v-else>-</div>
              </div>
            </div>
            <div class="item5 item">
              <div class="title">区域面积</div>
              <div class="value">{{
                dataDetail.acreage ? dataDetail.acreage : '-'
              }}</div
              ><span v-if="dataDetail.acreage" class="detail-unit"
                >m<sup>2</sup></span
              >
            </div>
            <div class="item7 item">
              <div class="title">联系电话</div>
              <div class="value">{{
                dataDetail.telephone ? dataDetail.telephone : '-'
              }}</div>
            </div>
            <div class="item8 item">
              <div class="title">描述</div>
              <div class="value">{{
                dataDetail.description ? dataDetail.description : '-'
              }}</div>
            </div>
          </div>
        </div>
        <div class="other">
          <div class="top">
            <div class="title">其他</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div class="item1 item">
              <div class="title">创建人</div>
              <div class="value">{{
                dataDetail.createBy ? dataDetail.createBy : '-'
              }}</div>
            </div>
            <div class="item2 item">
              <div class="title">创建时间</div>
              <div class="value">{{
                dataDetail.createTime ? dataDetail.createTime : '-'
              }}</div>
            </div>
            <div class="item3 item">
              <div class="title">最近修改人</div>
              <div class="value">{{
                dataDetail.lastModifyBy ? dataDetail.lastModifyBy : '-'
              }}</div>
            </div>
            <div class="item4 item">
              <div class="title">最近修改时间</div>
              <div class="value">{{
                dataDetail.lastModifyTime ? dataDetail.lastModifyTime : '-'
              }}</div>
            </div>
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
  } from '@/api/system/space';
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
  const disable1 = ref(false);

  const colorList = ['#FDAD15', '#007AFF', '#00B42A'];

  const data = reactive({
    // 查询参数
    queryParams: {
      areaInfoName: undefined,
      areaInfoStatus: undefined,
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    },
    // 表单数据
    form: {} as DataRecord,
    // 表单验证规则
    rules: {
      parentId: [{ required: true, message: '请选择上级空间' }],
      areaInfoStatus: [{ required: true, message: '请选择状态' }],
      areaInfoName: [
        { required: true, message: '请输入空间名称' },
        {
          match: /^[\u4e00-\u9fa5a-zA-Z0-9_#]{1,15}$/,
          message: '最长15字符，可以包含中文、英文、字母、数字、下划线、#',
        },
      ],
      areaInfoCode: [
        { required: true, message: '请输入空间名称' },
        {
          match: /^[a-zA-Z0-9-]{2,10}$/,
          message: '长度2-10位，可以包含字母、数字',
        },
      ],
      telephone: [
        {
          validator: (value: any, cb: any) => {
            if (
              value !== '' &&
              value != null &&
              !/^1[3456789]\d{9}$|^\d{3,4}-\d{7,8}$/.test(value)
            ) {
              cb('请输入正确的手机号或座机号');
            } else {
              cb();
            }
          },
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
    title.value = '新增空间';
    disable1.value = false;
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
      title.value = '修改空间';
      disable1.value = true;
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
      .download('/system/space/export', { ...queryParams.value }, '空间数据')
      .finally(() => {
        exportLoading.value = false;
      });
  };

  /**
   * 过滤空间树
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
    queryParams.value.areaInfoName = undefined;
    queryParams.value.areaInfoStatus = undefined;
    handleQuery();
  };
</script>

<script lang="ts">
  export default {
    name: 'Space',
  };
</script>

<style scoped lang="less">
  .add-box {
    position: relative;
    margin-top: 30px;
    padding-top: 30px;
    padding-right: 25px;
    border: 1px solid #dde1e9;
    border-radius: 2px;

    .info {
      position: absolute;
      top: -14px;
      left: 19px;
      width: 68px;
      height: 28px;
      color: #86909c;
      font-weight: 400;
      font-size: 14px;
      font-family: carmonyOS-Regular, sans-serif;
      line-height: 24px;
      text-align: center;
      background: #fff;
      border: 1px solid #dde1e9;
      border-radius: 2px;
    }
  }

  .unit {
    margin-left: 13px;
    color: #4e5969;
    font-weight: 400;
    font-size: 14px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 24px;
    text-align: left;
    text-transform: none;
  }

  .base {
    margin-top: 6px;
  }

  .other {
    margin-top: 25px;
  }

  .top {
    display: flex;
    align-items: center;

    .title {
      color: #86909c;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
    }

    .line {
      flex: 1;
      height: 1px;
      margin-left: 7px;
      border: 1px solid #dde1e9;
    }
  }

  .item {
    display: flex;
    margin: 21px 0;

    .title {
      width: 90px;
      color: #4e5969;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
      text-align: right;
    }

    .value {
      margin-left: 27px;
      color: rgb(0 0 0 / 85%);
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
    }

    .detail-unit {
      margin-left: 4px;
      color: #4e5969;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
    }
  }
</style>
