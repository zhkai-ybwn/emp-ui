<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.system', '设备管理', '设备信息']" />
    <a-card class="general-card" :title="'设备信息'">
      <a-row>
        <a-col
          :xs="9"
          :sm="6"
          :md="5"
          :lg="4"
          :xl="4"
          style="margin-right: 10px"
        >
          <a-input-search
            v-model="deptName"
            placeholder="输入设备类别搜索"
            style="max-width: 240px; margin-bottom: 8px"
            allow-clear
          />
          <a-tree
            ref="deviceTreeRef"
            :data="deviceTree"
            default-expand-all
            show-line
            :field-names="{
              key: 'id',
              title: 'deviceTypeName',
            }"
            @select="handleSelectNode"
          />
        </a-col>
        <a-col :xs="15" :sm="18" :md="19" :lg="20" :xl="19">
          <!-- 头部区域 -->
          <div class="header">
            <!-- 搜索栏 -->
            <div v-show="showQuery" class="header-query">
              <a-form ref="queryRef" :model="queryParams" layout="inline">
                <a-form-item field="deviceInfoName" hide-label>
                  <a-input
                    v-model="queryParams.deviceInfoName"
                    placeholder="输入关键字搜索"
                    allow-clear
                    style="width: 180px"
                    @press-enter="handleQuery"
                  />
                </a-form-item>
                <a-form-item field="areaInfoStatus" hide-label>
                  <a-select
                    v-model="queryParams.deviceInfoStatus"
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
                <a-form-item field="status" hide-label>
                  <a-select
                    v-model="queryParams.systemCode"
                    placeholder="所属系统"
                    allow-clear
                    style="width: 150px"
                    :options="systemOptions"
                    :field-names="{
                      value: 'dictCode',
                      label: 'dictValue',
                    }"
                  />
                </a-form-item>
                <a-form-item field="status" hide-label>
                  <a-tree-select
                    v-model="queryParams.areaInfoId"
                    :data="spaceOptions"
                    placeholder="安装位置"
                    allow-clear
                    style="width: 200px"
                    :field-names="{
                      key: 'id',
                      title: 'areaInfoName',
                    }"
                  ></a-tree-select>
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
                      v-permission="['system:equipment:info:add']"
                      type="primary"
                      @click="toAdd"
                    >
                      <template #icon><icon-plus /></template>新增
                    </a-button>
                    <a-button
                      v-permission="['system:equipment:info:update']"
                      type="primary"
                      status="success"
                      :disabled="single"
                      :title="single ? '请选择一条要修改的数据' : ''"
                      @click="toUpdate(ids[0])"
                    >
                      <template #icon><icon-edit /></template>修改
                    </a-button>
                    <a-button
                      v-permission="['system:equipment:info:delete']"
                      type="primary"
                      status="danger"
                      :disabled="multiple"
                      :title="multiple ? '请选择要删除的数据' : ''"
                      @click="handleBatchDelete"
                    >
                      <template #icon><icon-delete /></template>删除
                    </a-button>
                    <!-- <a-button
                        v-permission="['system:equipment:info:export']"
                        :loading="exportLoading"
                        type="primary"
                        status="warning"
                        @click="handleExport"
                      >
                        <template #icon><icon-download /></template>导出
                      </a-button> -->
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
            :pagination="{
              showTotal: true,
              showPageSize: true,
              total: total,
              current: queryParams.page,
            }"
            :bordered="false"
            column-resizable
            stripe
            size="large"
            :scrollbar="true"
            :scroll="{
              x: '120%',
              y: '650px',
            }"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            @selection-change="handleSelectionChange"
          >
            <template #columns>
              <a-table-column
                title="设备编码"
                data-index="deviceInfoCode"
                :width="250"
              />
              <a-table-column title="设备名称">
                <template #cell="{ record }">
                  <a-link @click="toDetail(record.id)">{{
                    record.deviceInfoName
                  }}</a-link>
                </template>
              </a-table-column>
              <a-table-column title="所属类别" data-index="deviceTypeName" />
              <a-table-column
                title="状态"
                data-index="deviceInfoStatus"
                :width="100"
              >
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
                      :style="{
                        background: colorList[record.deviceInfoStatus],
                      }"
                    ></span>
                    {{ ['闲置', '使用', '维护'][record.deviceInfoStatus] }}</div
                  >
                </template>
              </a-table-column>
              <a-table-column title="所属系统" data-index="systemName">
              </a-table-column>
              <a-table-column title="安装位置">
                <template #cell="{ record }">
                  {{
                    record.deviceInstall
                      ? record.deviceInstall.areaInfoName
                      : ''
                  }}
                </template>
              </a-table-column>
              <a-table-column title="描述" data-index="description">
              </a-table-column>
              <a-table-column
                title="操作"
                align="center"
                fixed="right"
                :width="160"
              >
                <template #cell="{ record }">
                  <a-button
                    v-permission="['system:equipment:info:update']"
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
                      v-permission="['system:equipment:info:delete']"
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
        </a-col>
      </a-row>

      <!-- 表单区域 -->
      <a-drawer
        :title="title"
        :visible="visible"
        :width="580"
        :mask-closable="false"
        unmount-on-close
        render-to-body
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-tabs type="capsule">
          <a-tab-pane key="1">
            <template #title>
              <div
                ><span style="margin-right: 3px; color: rgb(245 63 63)">*</span
                >基础信息</div
              >
            </template>
            <a-form
              ref="formRef"
              :rules="rules"
              :model="form"
              :label-col-props="{ span: 4 }"
              :wrapper-col-props="{ span: 20 }"
            >
              <a-form-item
                field="deviceInfoName"
                label="设备名称"
                validate-trigger="blur"
              >
                <a-input
                  v-model="form.deviceInfoName"
                  placeholder="请输入内容"
                />
              </a-form-item>
              <a-form-item field="deviceTypeId" label="所属类别">
                <a-tree-select
                  v-model="form.deviceTypeId"
                  :data="deviceOptions"
                  placeholder="请选择"
                  allow-clear
                  :field-names="{
                    key: 'id',
                    title: 'deviceTypeName',
                  }"
                ></a-tree-select>
              </a-form-item>
              <a-form-item
                field="deviceInfoStatus"
                label="状态"
                validate-trigger="change"
              >
                <a-select
                  v-model="form.deviceInfoStatus"
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
              <a-form-item field="systemCode" label="所属系统">
                <a-select
                  v-model="form.systemCode"
                  placeholder="所属系统"
                  allow-clear
                  :options="systemOptions"
                  :field-names="{
                    value: 'dictCode',
                    label: 'dictValue',
                  }"
                  @change="changeCode(form)"
                />
              </a-form-item>
              <a-form-item field="" label="上级设备">
                <a-select
                  v-model="form.parentId"
                  :options="superiorOptions"
                  placeholder="请选择"
                  allow-clear
                  allow-search
                  :field-names="{
                    value: 'id',
                    label: 'deviceInfoName',
                  }"
                ></a-select>
              </a-form-item>
              <a-form-item
                field="deviceInstall.areaInfoId"
                label="安装位置"
                :rules="[{ required: true, message: '请选择安装位置' }]"
              >
                <a-tree-select
                  v-model="form.deviceInstall.areaInfoId"
                  :data="spaceOptions"
                  placeholder="请选择"
                  allow-clear
                  :field-names="{
                    key: 'id',
                    title: 'areaInfoName',
                  }"
                ></a-tree-select>
              </a-form-item>
              <a-form-item
                field="deviceInstall.installTime"
                label="安装时间"
                :rules="[{ required: true, message: '请选择安装时间' }]"
              >
                <a-date-picker
                  v-model="form.deviceInstall.installTime"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
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
          </a-tab-pane>
          <a-tab-pane key="2" title="设备参数">
            <div
              v-for="(item, index) in form.deviceParamList"
              :key="index"
              class="list"
            >
              <div class="item-title">
                <div class="left">参数信息{{ index + 1 }}</div>
                <div class="right" @click="deleteParam(index)"
                  ><icon-delete
                /></div>
              </div>
              <div class="item">
                <a-form
                  :rules="rules"
                  :model="form"
                  :label-col-props="{ span: 4 }"
                  :wrapper-col-props="{ span: 20 }"
                >
                  <a-form-item
                    field="paramName"
                    label="参数名称"
                    validate-trigger="blur"
                  >
                    <a-input
                      v-model="item.paramName"
                      placeholder="请输入内容"
                    />
                  </a-form-item>
                  <a-form-item
                    field="paramValue"
                    label="参数值"
                    validate-trigger="blur"
                  >
                    <a-input
                      v-model="item.paramValue"
                      placeholder="请输入数值"
                    />
                  </a-form-item>
                </a-form>
              </div>
            </div>
            <a-button type="primary" @click="handleClick1">
              <template #icon>
                <icon-plus-circle />
              </template>
              添加参数
            </a-button>
          </a-tab-pane>
          <a-tab-pane key="3" title="绑定点位">
            <div
              v-for="(item, index) in form.devicePointBindInfoList"
              :key="index"
              class="list"
            >
              <div class="item-title">
                <div class="left">点位信息{{ index + 1 }}</div>
                <div class="right" @click="deletePoint(index)"
                  ><icon-delete
                /></div>
              </div>
              <div class="item">
                <a-form
                  :rules="rules"
                  :model="form"
                  :label-col-props="{ span: 4 }"
                  :wrapper-col-props="{ span: 20 }"
                >
                  <a-form-item
                    field="pointId"
                    label="点位绑定"
                    validate-trigger="blur"
                  >
                    <a-select
                      v-model="item.pointId"
                      placeholder="请选择"
                      allow-search
                      @change="changeName(item)"
                    >
                      <a-option
                        v-for="it in ponitOptions"
                        :key="it.id"
                        :value="it.pointId"
                      >
                        {{ it.pointName }}
                      </a-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    field="pointId"
                    label="点位id"
                    validate-trigger="blur"
                  >
                    <a-input v-model="item.pointId" disabled />
                  </a-form-item>

                  <a-form-item
                    field="pointGroupName"
                    label="点位组"
                    validate-trigger="blur"
                  >
                    <a-select
                      v-model="item.pointGroupId"
                      placeholder="请选择"
                      allow-clear
                      allow-search
                      @change="changePointGroupName(item)"
                    >
                      <a-option
                        v-for="it in ponitSetOptions"
                        :key="it.id"
                        :value="`${it.id}`"
                      >
                        {{ it.pointGroupName }}
                      </a-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    field="pointGroupName"
                    label="点位类型"
                    validate-trigger="blur"
                  >
                    <a-select
                      v-model="item.pointType"
                      placeholder="请选择"
                      allow-clear
                      allow-search
                    >
                      <a-option
                        v-for="it in ponitTypeOptions"
                        :key="it.dictCode"
                        :value="it.dictCode"
                      >
                        {{ it.dictValue }}
                      </a-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    field="unit"
                    label="数据单位"
                    validate-trigger="blur"
                  >
                    <a-input v-model="item.unit" />
                  </a-form-item>
                  <a-form-item
                    field="description"
                    label="描述"
                    validate-trigger="blur"
                  >
                    <a-textarea
                      v-model="item.description"
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
            </div>
            <a-button type="primary" @click="handleClick2">
              <template #icon>
                <icon-plus-circle />
              </template>
              添加点位
            </a-button>
          </a-tab-pane>
        </a-tabs>
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
        <div class="item1">
          <div class="title">
            <div class="name">基础信息</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div class="section">
              <div class="name">设备名称</div>
              <div class="value">{{ dataDetail.deviceInfoName }}</div>
            </div>
            <div class="section">
              <div class="name">设备编码</div>
              <div class="value">{{ dataDetail.deviceInfoCode }}</div>
            </div>
            <div class="section">
              <div class="name">所属类别</div>
              <div class="value">{{ dataDetail.deviceTypeName }}</div>
            </div>
            <div class="section">
              <div class="name">状态</div>
              <div class="value">
                <div
                  v-if="
                    dataDetail.deviceInfoStatus ||
                    dataDetail.deviceInfoStatus === 0
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
                      background: colorList[dataDetail.deviceInfoStatus],
                    }"
                  ></span>
                  {{ ['闲置', '使用', '维护'][dataDetail.deviceInfoStatus] }}
                </div>
                <div v-else>-</div>
              </div>
            </div>
            <div class="section">
              <div class="name">所属系统</div>
              <div class="value">{{
                dataDetail.systemName ? dataDetail.systemName : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">上级设备</div>
              <div class="value">{{
                dataDetail.parentName ? dataDetail.parentName : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">安装位置</div>
              <div class="value">{{
                dataDetail.deviceInstall
                  ? dataDetail.deviceInstall.areaInfoName
                  : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">安装时间</div>
              <div class="value">{{
                dataDetail.deviceInstall
                  ? dataDetail.deviceInstall.installTime
                  : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">联系电话</div>
              <div class="value">{{
                dataDetail.telephone ? dataDetail.telephone : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">描述</div>
              <div class="value">{{
                dataDetail.description ? dataDetail.description : '-'
              }}</div>
            </div>
          </div>
        </div>
        <div class="item2">
          <div class="title">
            <div class="name">设备参数</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div
              v-for="(item, index) in dataDetail.deviceParamList"
              :key="index"
              class="list-box"
            >
              <div class="section">
                <div class="name">参数名称</div>
                <div class="value">{{ item.paramName }}</div>
              </div>
              <div class="section">
                <div class="name">参数值</div>
                <div class="value">{{ item.paramValue }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item3">
          <div class="title">
            <div class="name">绑定点位</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div
              v-for="(item, index) in dataDetail.devicePointBindInfoList"
              :key="index"
              class="list-box"
            >
              <div class="section">
                <div class="name">点位绑定</div>
                <div class="value">{{ item.pointName }}</div>
              </div>
              <div class="section">
                <div class="name">点位id</div>
                <div class="value">{{ item.pointId }}</div>
              </div>
              <div class="section">
                <div class="name">点位组</div>
                <div class="value">{{
                  item.pointGroupName ? item.pointGroupName : '-'
                }}</div>
              </div>
              <div class="section">
                <div class="name">点位类型</div>
                <div class="value">{{
                  item.pointType ? item.pointType : '-'
                }}</div>
              </div>
              <div class="section">
                <div class="name">数据单位</div>
                <div class="value">{{ item.unit ? item.unit : '-' }}</div>
              </div>
              <div class="section">
                <div class="name">描述</div>
                <div class="value">{{
                  item.description ? item.description : '-'
                }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item4">
          <div class="title">
            <div class="name">其他</div>
            <div class="line"></div>
          </div>
          <div class="list">
            <div class="section">
              <div class="name">创建人</div>
              <div class="value">{{ dataDetail.createBy }}</div>
            </div>
            <div class="section">
              <div class="name">创建时间</div>
              <div class="value">{{ dataDetail.createTime }}</div>
            </div>
            <div class="section">
              <div class="name">最近修改人</div>
              <div class="value">{{
                dataDetail.lastModifyBy ? dataDetail.lastModifyBy : '-'
              }}</div>
            </div>
            <div class="section">
              <div class="name">最近修改时间</div>
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
  import {
    DataRecord,
    ListParam,
    list,
    get,
    add,
    update,
    del,
    dict,
    devicePoint,
    deviceParam,
    point,
    PointList,
    pointGroup,
    deviceList,
  } from '@/api/system/info';
  import { list as listDeviceTree } from '@/api/system/type';
  import { list as listSpaceTree } from '@/api/system/space';
  import checkPermission from '@/utils/permission';
  import { FieldRule, TreeNodeData } from '@arco-design/web-vue';

  const colorList = ['#FDAD15', '#007AFF', '#00B42A'];

  const { proxy } = getCurrentInstance() as any;

  const dataList = ref<DataRecord[]>([]);
  const dataDetail = ref<DataRecord>({
    deviceInstall: {},
  });
  const total = ref(0);
  const ids = ref<Array<number>>([]);
  const title = ref('');
  const single = ref(true);
  const multiple = ref(true);
  const showQuery = ref(true);
  const loading = ref(false);
  const detailLoading = ref(false);
  // const exportLoading = ref(false);
  const visible = ref(false);
  const userRoleVisible = ref(false);
  const detailVisible = ref(false);
  const spaceLoading = ref(false);
  const deviceOptions = ref<TreeNodeData[]>([]);
  const spaceOptions = ref<TreeNodeData[]>([]);
  const ponitOptions = ref<PointList[]>([]);
  const superiorOptions = ref([]);
  const ponitTypeOptions = ref<
    { dictCode: string; dictValue: string; id: number }[]
  >([]);
  const ponitSetOptions = ref<
    { id: string; pointGroupName: string; unit: string }[]
  >([]);
  const systemOptions = ref<{ dictValue: string; dictCode: string }[]>([]);
  const deviceTree = ref<TreeNodeData[]>([]);
  const deptName = ref('');

  const data = reactive({
    // 查询参数
    queryParams: {
      deviceInfoName: undefined,
      deviceInfoStatus: undefined,
      deviceTypeId: undefined,
      systemCode: undefined,
      areaInfoId: undefined,
      page: 1,
      size: 10,
      sort: ['createTime,desc'],
    },
    // 表单数据
    form: { deviceInstall: {} } as DataRecord,
  });
  const { queryParams, form } = toRefs(data);

  // 表单验证规则
  const rules = computed((): Record<string, FieldRule[]> => {
    return {
      deviceInfoName: [
        {
          required: true,
          message: '请输入设备名称',
        },
        {
          match: /^[-a-zA-Z0-9_#\u4e00-\u9fa5]{1,15}$/,
          message: '最长15字符，可以包含中文、英文、字母、数字、下划线、#、-',
        },
      ],
      deviceTypeId: [
        {
          required: true,
          message: '请选择设备类别',
        },
      ],
      deviceInfoStatus: [{ required: true, message: '请选择状态' }],
      // areaInfoId: [{ required: true, message: '请选择安装位置' }],
      // systemCode: [{ required: true, message: '请选择所属系统' }],
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
    };
  });

  /**
   * 查询设备树
   *
   * @param name 名称
   */
  const getDeptTree = (name: string) => {
    listDeviceTree({
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
      deviceTypeName: name,
    }).then((res) => {
      deviceTree.value = res.data;
      setTimeout(() => {
        proxy.$refs.deviceTreeRef.expandAll();
      }, 0);
    });
  };
  getDeptTree('');
  watch(deptName, (val) => {
    getDeptTree(val);
  });

  /**
   * 查询列表
   *
   * @param params 查询参数
   */
  const getList = (params: ListParam = { ...queryParams.value }) => {
    loading.value = true;
    list(params)
      .then((res) => {
        dataList.value = res.data.records;
        total.value = res.data.total;
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
    form.value.devicePointBindInfoList = [
      {
        pointId: undefined,
        pointGroupId: undefined,
        description: '',
        unit: '',
        pointType: '',
      },
    ] as devicePoint[];
    form.value.deviceParamList = [
      {
        paramName: '',
        paramValue: '',
      },
    ] as deviceParam[];
    // getDeviceOptions();
    // getSpaceOptions();
    title.value = '新增设备';
    visible.value = true;
  };

  /**
   * 打开修改对话框
   *
   * @param id ID
   */
  const toUpdate = (id: number) => {
    reset();
    // getDeviceOptions();
    // getSpaceOptions();
    get(id).then((res) => {
      form.value = res.data;
      if (!form.value.deviceInstall) {
        form.value.deviceInstall = {
          areaInfoId: undefined,
        };
      }

      title.value = '修改设备';
      visible.value = true;
    });
  };

  /**
   * 查询设备列表
   */
  const getDeviceOptions = () => {
    listDeviceTree({
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    })
      .then((res) => {
        deviceOptions.value = res.data;
        deviceOptions.value[0].disabled = true;
      })
      .finally(() => {
        //
      });
  };
  getDeviceOptions();

  /**
   * 查询空间列表
   */
  const getSpaceOptions = () => {
    spaceLoading.value = true;
    listSpaceTree({
      sort: ['parentId,asc', 'serial_no,asc', 'createTime,desc'],
    })
      .then((res) => {
        spaceOptions.value = res.data;
      })
      .finally(() => {
        spaceLoading.value = false;
      });
  };
  getSpaceOptions();

  /**
   * 重置表单
   */
  const reset = () => {
    form.value = { deviceInstall: {} };
    proxy.$refs.formRef?.resetFields();
  };

  /**
   * 取消
   */
  const handleCancel = () => {
    visible.value = false;
    userRoleVisible.value = false;
    proxy.$refs.formRef?.resetFields();
    proxy.$refs.userRoleFormRef?.resetFields();
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
    dataDetail.value = { deviceInstall: {} };
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
   * 已选择的数据行发生改变时触发
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
  // const handleExport = () => {
  //   if (exportLoading.value) return;
  //   exportLoading.value = true;
  //   proxy
  //     .download('/system/info/export', { ...queryParams.value }, '设备数据')
  //     .finally(() => {
  //       exportLoading.value = false;
  //     });
  // };

  // /**
  //  * 过滤设备列表
  //  *
  //  * @param searchValue 搜索值
  //  * @param nodeData 节点值
  //  */
  // const filterDeptOptions = (searchValue: string, nodeData: TreeNodeData) => {
  //   if (nodeData.title) {
  //     return (
  //       nodeData.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
  //     );
  //   }
  //   return false;
  // };

  /**
   * 根据选中设备查询
   *
   * @param keys 选中节点 key
   */
  const handleSelectNode = (keys: Array<any>, data: any) => {
    if (data.node && data.node.parentId === 0) {
      queryParams.value.deviceTypeId = undefined;
      proxy.$refs.deviceTreeRef.selectNode(keys, false);
      return;
    }

    // if (data.selectedNodes.parentId !== 0) {
    if (queryParams.value.deviceTypeId === keys[0]) {
      queryParams.value.deviceTypeId = undefined;
      // 如已选中，再次点击则取消选中
      proxy.$refs.deviceTreeRef.selectNode(keys, false);
    } else {
      queryParams.value.deviceTypeId = keys.length === 1 ? keys[0] : undefined;
    }
    queryParams.value.page = 1;
    handleQuery();
    // }
  };

  /**
   * 查询
   */
  const handleQuery = () => {
    queryParams.value.page = 1;
    getList();
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    queryParams.value = {
      deviceInfoName: undefined,
      deviceInfoStatus: undefined,
      deviceTypeId: undefined,
      systemCode: undefined,
      areaInfoId: undefined,
      page: 1,
      size: 10,
      sort: ['createTime,desc'],
    };
    proxy.$refs.queryRef.resetFields();
    handleQuery();
  };

  /**
   * 切换页码
   *
   * @param current 页码
   */
  const handlePageChange = (current: number) => {
    queryParams.value.page = current;
    getList();
  };

  /**
   * 切换每页条数
   *
   * @param pageSize 每页条数
   */
  const handlePageSizeChange = (pageSize: number) => {
    queryParams.value.size = pageSize;
    getList();
  };

  /**
   * 添加设备参数
   * @returns {any}
   */
  const handleClick1 = () => {
    if (form.value.deviceParamList)
      form.value.deviceParamList.push({
        paramName: '',
        paramValue: '',
      });
  };

  /**
   * 添加点位参数
   * @returns {any}
   */
  const handleClick2 = () => {
    if (form.value.devicePointBindInfoList)
      form.value.devicePointBindInfoList.push({
        pointId: undefined,
        pointGroupId: undefined,
        description: '',
        unit: '',
        pointType: '',
      });
  };

  /**
   * 所属系统
   * @returns {any}
   */
  const ownSystem = () => {
    dict({
      sort: ['id,asc'],
      category: 'system_code',
    }).then((res) => {
      systemOptions.value = res.data;
    });
  };
  ownSystem();

  /**
   * 点位组
   * @returns {any}
   */
  const pointSet = () => {
    pointGroup({
      sort: ['createTime,desc'],
    }).then((res) => {
      ponitSetOptions.value = res.data;
    });
  };
  pointSet();

  /**
   * 点位类型
   * @returns {any}
   */
  const pointType = () => {
    dict({
      sort: ['id,asc'],
      category: 'point_type',
    }).then((res) => {
      ponitTypeOptions.value = res.data;
    });
  };
  pointType();

  /**
   * 点位列表
   * @returns {any}
   */
  const pointList = () => {
    point({
      sort: ['createTime,desc'],
    }).then((res) => {
      ponitOptions.value = res.data;
    });
  };
  pointList();

  /**
   * 上级设备列表
   * @returns {any}
   */
  const deviceInfo = () => {
    deviceList({
      sort: ['createTime,desc'],
    }).then((res) => {
      superiorOptions.value = res.data;
    });
  };
  deviceInfo();

  const deleteParam = (x: any) => {
    if (form.value.deviceParamList) form.value.deviceParamList.splice(x, 1);
  };

  const deletePoint = (x: any) => {
    if (form.value.devicePointBindInfoList)
      form.value.devicePointBindInfoList.splice(x, 1);
  };

  const changeName = (item: any) => {
    item.pointName = ponitOptions.value.find(
      (el) => el.pointId === item.pointId
    )?.pointName;
  };

  const changePointGroupName = (item: any) => {
    item.pointGroupName = ponitSetOptions.value.find(
      (el) => +el.id === +item.pointGroupId
    )?.pointGroupName;
    item.unit = ponitSetOptions.value.find(
      (el) => +el.id === +item.pointGroupId
    )?.unit;
  };

  const changeCode = (form: any) => {
    form.systemName = systemOptions.value.find(
      (el) => el.dictCode === form.systemCode
    )?.dictValue;
  };
</script>

<script lang="ts">
  export default {
    name: 'User',
  };
</script>

<style scoped lang="less">
  .title {
    display: flex;
    align-items: center;
    margin: 20px 0;

    .name {
      color: #86909c;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;
      text-align: left;
      text-transform: none;
    }

    .line {
      flex: 1;
      height: 1px;
      margin-left: 6px;
      border: 1px solid #dde1e9;
    }
  }

  .section {
    display: flex;
    align-items: center;
    height: 40px;
    font-family: HarmonyOS-Regular, sans-serif;

    .name {
      width: 100px;
      margin-right: 27px;
      color: #4e5969;
      font-weight: 400;
      font-size: 14px;
      font-style: normal;
      line-height: 24px;
      text-align: right;
    }

    .value {
      color: rgb(0 0 0 / 85%);
      font-weight: 400;
      font-size: 14px;
      font-style: normal;
      line-height: 24px;
      text-align: left;
      text-transform: none;
    }
  }

  .list-box {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    border: 1px solid #dde1e9;
    border-radius: 2px;
  }

  .list {
    .item-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      color: #86909c;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;
      text-align: left;
      text-transform: none;
    }

    .item {
      margin-bottom: 20px;
      padding-top: 20px;
      padding-right: 20px;
      border: 1px solid #dde1e9;
      border-radius: 2px;
    }

    .right {
      color: red;
      cursor: pointer;
    }
  }

  :deep(
      .arco-tabs-nav-type-capsule
        .arco-tabs-nav-tab:not(.arco-tabs-nav-tab-scroll)
    ) {
    justify-content: flex-start;
  }

  :deep(.arco-tabs-pane) {
    text-align: center;
  }
</style>
