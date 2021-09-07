<template>
  <div class="setting">
    <el-form :model="lotterySettingForm" ref="lotterySettingForm" label-position="top" :rules="rules">
      <el-form-item
        label="奖品池列表"
        prop="giftPondList"
      >
      <el-checkbox-group v-model="lotterySettingForm.giftPondList" :max="8">
        <template v-if="giftPondOptions.length">
          <el-checkbox v-for="gift in giftPondOptions" :label="gift.lottery_id" :key="gift.lottery_id" border>
            <span>{{gift.lottery_name}}</span>
            <img :src="gift.image_url">
          </el-checkbox>
        </template>
      </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="起始矿石数"
        prop="initialOre"
      >
        <el-input type="number" v-model.number="lotterySettingForm.initialOre"></el-input>
      </el-form-item>
      <el-form-item
        label="抽奖耗费矿石数"
        prop="giftUsedOres"
      >
        <el-input type="number" v-model.number="lotterySettingForm.giftUsedOres"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelLotterySettings">取消</el-button>
        <el-button type="primary" @click="saveLotterySettings">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ajax from '@/config/fetch';
const getGoodsUrl: string = '/api/get_lottery_goods';
const getAllGoodsUrl: string = '/api/get_all_lottery_goods';
const addConsumablesInfoUrl: string = '/api/add_consumables_info';
const getConsumablesInfoUrl: string = '/api/get_consumables_info';
interface Result {
  status: number;
  message: string;
  data: string | object | number[] | object[] | string[];
}
export default defineComponent({
  name: 'Setting',
  data() {
    return {
      lotterySettingForm: {
        giftPondList: this.$store.state.setting.giftPondList,
        initialOre: this.$store.state.setting.initialOre,
        giftUsedOres: this.$store.state.setting.giftUsedOres
      },
      giftPondOptions: [],
      rules: {
        initialOre: [
          { required: true, message: '请输入起始矿石数', trigger: 'blur' }
        ],
        giftUsedOres: [
          { required: true, message: '请输入抽奖耗费矿石数', trigger: 'change' }
        ],
        giftPondList: [
          { type: 'array', len: 8, required: true, message: '请选择八个奖品', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    // 取消跳回抽奖页面
    cancelLotterySettings() {
      this.$router.push('/home');
    },
    // 保存当前用户的抽奖设置
    saveLotterySettings() {
      this.$refs.lotterySettingForm.validate((valid: boolean) => {
        if (valid) {
          let params = JSON.stringify({
            gift_list: this.lotterySettingForm.giftPondList,
            gift_count: this.lotterySettingForm.initialOre - 0,
            gift_used_count: this.lotterySettingForm.giftUsedOres - 0
          });
          console.log('saveLotterySettings', params);
          ajax(addConsumablesInfoUrl, 'post', params).then((res: Result) => {
            this.$router.push('/home');
          });
        }
      });
    }
  },
  created() {
    // 获取可配置的抽奖列表
    ajax(getAllGoodsUrl).then((res: Result) => {
      this.giftPondOptions = res.data;
    });
    // 获取当前用户的抽奖设置
    ajax(getGoodsUrl).then((res: Result) => {
      this.lotterySettingForm.giftPondList = res.data.map((item: object) => item.lottery_id);
    });
    // 获取当前用户抽奖
    ajax(getConsumablesInfoUrl).then((res: Result) => {
      this.lotterySettingForm.initialOre = res.data.consumables_count;
      this.lotterySettingForm.giftUsedOres = res.data.consume_count;
    });
  }
});
</script>

<style scoped>
.setting {
  width: 400px;
  padding: 20px;
}
.el-select {
  width: 100%;
}
img {
  margin-left: 4px;
  width: 20px;
  height: 20px;
}
img, span {
  vertical-align: middle;
}
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left:0px;
}
.el-checkbox.is-bordered {
  width: 33.33333333%;
}
.el-checkbox {
  margin-right: 0px;
}
.el-checkbox-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
