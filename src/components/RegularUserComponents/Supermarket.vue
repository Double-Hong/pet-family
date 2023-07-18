<template>
<!--  商品展示框-->
  <el-card>
    <!--  搜索框-->
    <el-card class="box-card"  id="search">
      <el-row>
        <el-col :span="18">
          <!-- clearable属性是设置为可以一键删除文本框的内容 -->
          <el-input v-model="searchName" placeholder="请输入你想查找的商品名称" clearable></el-input>
          <el-button type="primary" @click="findGoods" icon="Search"/></el-col>
      </el-row>
    </el-card>
    <div class="container">
      <div v-for="(row, rowIndex) in slicedProducts" :key="rowIndex" class="row">
        <div v-for="(product, colIndex) in row" :key="colIndex" class="col">
<!--          <template #default="scope"></template>-->
          <div class="product-card" @click="redirectToAnotherPage(product)">
            <div class="product-image-wrapper">
              <img :src="product.photo" alt="Product Image" class="product-image" />
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <div class="price">单价：{{product.price}}（元）</div>
                <div class="sale">销量：{{product.saleVolume}}（个）</div>
                <div class="intro">商品简介：{{product.introduce}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>


<script lang="ts">
import {defineComponent, reactive, computed, ref} from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';
import {Repair, Delete, Search,Plus} from "@icon-park/vue-next"
import {ElMessage} from "element-plus";
import {useRegularStore} from "@/stores/RegularUser";
import type {commodity} from "@/utils/interface";

export default defineComponent({
  name: 'ProductList',
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  components: {
    Repair,
    Search,
    Delete,
  },
  setup() {
    //数据
    interface productDetail{
      id:number,
      name:string,
      photo:string,
      introduce:string,
      price:number,
      brandId:number,
      saleVolume:number,
      typeId:number,
      state:string,
    }
    const pageData = reactive({
      goods: [] as productDetail[]
    });
    //用于传递商品id
    const router = useRouter();
    const store= useRegularStore()
    // 跳转到另外一个页面
    const redirectToAnotherPage = (row:productDetail) => {
      store.commodityId=row.id
      // console.log(store.contentVisible)
      router.push('/CommodityDetail');
    };

    //模糊查找
    const searchName = ref("")

    // ... 执行获取商品数据并对 pageData.goods 进行赋值的逻辑
    axios.post("http://localhost:9090/commodity-entity/getAllCommdities").then(res=>{
      pageData.goods=res.data.data
      // console.log(pageData.goods)
    })

    const slicedProducts = computed(() => {
      const products = pageData.goods;
      const sliced = [];
      const numPerRow = 5;
      for (let i = 0; i < products.length; i += numPerRow) {
        if (products[i].state=="上架中"){
          sliced.push(products.slice(i, i + numPerRow));
        }
      }
      return sliced;
    });
    const findGoods = () =>{
      axios.post("http://localhost:9090/commodity-entity/getCommdityByName/"+searchName.value).then(res=>{
        pageData.goods=res.data.data
      })
    }

    return {
      slicedProducts,
      searchName,
      findGoods,
      pageData,
      redirectToAnotherPage,
      store,
    };

  }

});

//过滤器

</script>

<style scoped>
#search .el-input {
  width: 550px;
  margin-left: 266px;
}

.el-dialog .el-input {
  width: 100%;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

.row {
  display: flex;
  width: 100%;
}

.col {
  flex-basis: 20%;
  padding: 10px;
  box-sizing: border-box;
}

.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px;
  position: relative; /* 添加相对定位 */
}

.product-image-wrapper {
  flex-grow: 1;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  min-height: 200PX;
  max-height: 200px;
  object-fit: cover;
}

.product-info {
  position: relative; /* 添加绝对定位 */
  top: 10px; /* 调整文字到图片底部的距离 */
  left: 0; /* 文字居左对齐 */
  width: 100%; /* 文字宽度与父容器相同 */
}

.product-info h3,
.product-info div {
  margin: 0;
}
</style>
