<template>
  <div style="padding: 10px">
    <h2>总销售额：{{ totalPrice }} 订单总量：{{ totalNum }}</h2>
      <div class="demo-date-picker">
        <div class="container">
          <div class="block">
            <el-date-picker
                v-model="value2"
                format="YYYY"
                value-format="YYYY"
                type="year"
                placeholder="请选择年份"
            />
            <el-button type="primary" @click="searchtime(value2)" style="margin-left: 5px">生成年度报表</el-button>
            <el-button @click="addQuantity">增加库存</el-button>
          </div>
        </div>
      </div>
    <div style="display: flex;">
      <div ref="myChart" id="myChart" style="width: 600px; height: 400px;"></div>
      <div ref="myCharts" id="myCharts" style="width: 600px; height: 400px;"></div>
    </div>
    <el-dialog
        v-model="addQuantityVisible"
        title="增加库存"
        center
    >
      <el-form>
        <el-form-item label="商品类型">
          <el-select v-model="myPageInfo.commodityType">
            <el-option
                v-for="item in CommodityTypeData.options"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-select v-model="addQuantityForm.formInfo.commodityId" placeholder="选择商品">
            <el-option
                v-for="item in filterGoods"
                :key="item.id"
                :label="item.commodityName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="增加数量">
          <el-input-number v-model="addQuantityForm.formInfo.quantity" :min="1" :max="10000" label="请输入数量"></el-input-number>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="addQuantityForm.formInfo.warehouseId" clearable placeholder="请选择仓库">
            <el-option
                v-for="item in filterWarehouse"
                :label="item.warehouseName"
                :value="item.warehouseId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addQuantityVisible=false">取消</el-button>
        <el-button type="primary" @click="makeSureAddProductQuantity">确定</el-button>
      </template>
    </el-dialog>

  </div>

</template>

<script setup lang="ts">
import axios, {create} from "axios";
import {timelineItemProps} from "element-plus";
import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import {addQuantityForm, brand, comGoodsView, storage, warehouse} from "@/utils/interface";
import type {commodityType} from "@/utils/interface";
import {ElMessage} from "element-plus";
import * as echarts from "echarts";
const myChart = ref<any>(null);
const value2 = ref('')
const props = defineProps({
  nowShop: {
    type: Number,
    required: true
  }
})
let tableData = reactive({
    filterData: [{
      orderFormEntity: {
        id: '0',
        name:'ran',
        personId: '11',
        time: '2023-7-12',
        address: '重庆',
        phone: '1919191',
        state: '测试',
        totalPrice: '0'
      },
      list: []
    }]
  })
const tableData1 = ref({
  filterData: []
});
const totalPrice = computed(() => {
  let sum = 0;
  for (const item of tableData.filterData) {
    sum += parseFloat(item.orderFormEntity.totalPrice);
  }
  return sum;
});

const totalNum= computed(() => {
  let numsum = 0;
  for (const item of tableData.filterData) {
    numsum ++;
  }
  return numsum;
});
const searchtime = (val: string) => {
  myChart.value = echarts.init(document.getElementById('myChart') as HTMLDivElement);
  let filteredData = reactive([...tableData.filterData]); // 创建响应式数组副本
  if (value2.value != null) {
    filteredData = filteredData.filter((data) => {
      return data.orderFormEntity.time.includes(value2.value);
    });
  }
  // 根据月份分组并累加totalPrice
  const monthlyData = {};
  filteredData.forEach((data) => {
    const month = data.orderFormEntity.time.split('-')[1];
    if (monthlyData[month]) {
      monthlyData[month] += parseFloat(data.orderFormEntity.totalPrice);
    } else {
      monthlyData[month] = parseFloat(data.orderFormEntity.totalPrice);
    }
  });
  // 将累加的totalPrice传递到绘图的data中
  let xData = [];
  let data = [];
  for (let i = 1; i <= 12; i++) {
    const month = i < 10 ? `0${i}` : `${i}`;
    xData.push(month);
    data.push(monthlyData[month] || 0);
  }
  // 更新图表数据
  updateChart(xData, data);
};

const updateChart = (xData, data) => {
  const option = {
    xAxis: {
      type: "category",
      data: xData
    },
    yAxis: {
      type: "value",
    },
    series:[
      {
        data,
        type: "line",
        smooth: true,
        areaStyle:{},
        itemStyle : { normal: {label : {show: true}}},
        markLine:{
          data:[
            {type:"average",name:"平均值"}
          ]
        }
      }
    ]
  };
  myChart.value.setOption(option);
};
onMounted(() => {
  axios.get('http://localhost:9090/order-form-entity/getFinish/'+props.nowShop).then((res) => {
    tableData1.value.filterData.splice(0, tableData1.value.filterData.length);
    tableData1.value.filterData.push(...res.data.data);
    console.log(tableData1.value);
    updateCharts();
  });
  updateCharts();
});
function updateCharts() {
  if (ref("myCharts") && tableData1.value.filterData.length > 0) {
    console.log('tableData1');
    console.log(tableData1.value.filterData);
    const myCharts = ref<echarts.ECharts>();
    myCharts.value = echarts.init(document.getElementById('myCharts') as HTMLDivElement);
    const data = getDataForChart(tableData1.value.filterData);
    const option = {
      title: {
        left: "center"
      },
      legend: {
        left: "left"
      },
      series: [
        {
          name: "销量统计",
          type: "pie",
          radius : '55%',
          center: ['50%', '60%'],
          label: {
            normal: {
              show: true,
              formatter: '{b}: {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
            }
          },
          data
        }
      ]
    };
    myCharts.value.setOption(option);
  }
}

function getDataForChart(data) {
  const result = {};
  data.forEach((item) => {
    item.list.forEach((subItem) => {
      if (result[subItem.name]) {
        result[subItem.name] += subItem.orderGoodsEntity.num;
      } else {
        result[subItem.name] = subItem.orderGoodsEntity.num;
      }
    });
  });
  return Object.keys(result).map((name) => ({
    value: result[name],
    name
  }));
}
const addQuantityForm=reactive({
  formInfo:{} as addQuantityForm
})

const addQuantityVisible=ref(false);
const addQuantity=()=>{
  addQuantityVisible.value=true
  myPageInfo.commodityType=''
}
const makeSureAddProductQuantity=()=>{
  request.post("/storage-entity/addStorageQuantity",addQuantityForm.formInfo).then(res=>{
    if (res.data.code ==200){
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      addQuantityVisible.value=false
    }
  })
}
const myPageInfo=reactive({
  shopId:1,
  commodityType:"",
})
const CommodityTypeData=reactive({
  options:[] as commodityType[],
})
const brandData = reactive({
  options: [] as brand[],
})
const warehouseData = reactive({
  options:[] as warehouse[],
})
const filterWarehouse=computed(()=>{
  return warehouseData.options.filter(item=>item.warehouseId==makeSureAddWarehouse(addQuantityForm.formInfo.commodityId))
})
const filterGoods=computed(()=>{
  return GoodsData.filter(item=>item.state!="已删除")&&GoodsData.filter(item=>item.typeName==myPageInfo.commodityType)
})

const storageData=reactive({
  storageList:[] as storage[]
})
function makeSureAddWarehouse(commodityId:number){
  for (let i=0;i<storageData.storageList.length;i++){
    if (storageData.storageList[i].commodityId==commodityId){
      return storageData.storageList[i].warehouseId
    }
  }
}

const GoodsData:comGoodsView[]=reactive([]);
onMounted(()=>{
  request.get("/commodity-entity/selectComGoodsViewByShopId/"+myPageInfo.shopId).then((res)=>{
    GoodsData.push(...res.data.data)
  })
  request.get("/commodity-type-entity/selectAllCommodityType").then((res)=>{
    CommodityTypeData.options.push(...res.data.data)

  })

  request.get("/brand-entity/GetAllBrand").then((res)=>{
    brandData.options.push(...res.data.data)

  })
  request.get("/warehouse-info-entity/selectAllWarehouseInfo").then(res=>{
    warehouseData.options.push(...res.data.data)
  })
  request.get("/storage-entity/selectAllStorage").then(res=>{
    storageData.storageList.push(...res.data.data)
  })
})

axios.get("http://localhost:9090/order-form-entity/getFinish/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData.filterData.splice(0,tableData.filterData.length)
  tableData.filterData.push(...res.data.data)
  console.log(tableData.filterData)
})

</script>

<style scoped>

</style>