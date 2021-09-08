  // setup() {
  //   const store = useStore();
  //   const router = useRouter();
  //   let settingState = store.state.setting;
  //   let lotterySettingForm = reactive({
  //     giftPondList: settingState.giftPondList,
  //     giftUsedOres: settingState.initialOre,
  //     initialOre: settingState.giftUsedOres
  //   });
  //   let giftPondOptions = ref([]);
  //   ajax('/api/get_all_lottery_goods').then((res: Result) => {
  //     giftPondOptions.value = res.data;
  //   });
  //   ajax('/api/get_lottery_goods_settings').then((res: Result) => {
  //     lotterySettingForm.giftPondList = res.data.gift_list;
  //     lotterySettingForm.initialOre = res.data.gift_count;
  //     lotterySettingForm.giftUsedOres = res.data.gift_used_count;
  //     store.dispatch('saveSettings', lotterySettingForm);
  //   });
  //   function saveLotterySettings() {
  //     store.dispatch('saveSettings', lotterySettingForm);
  //   };
  //   function cancelLotterySettings() {
  //     router.push('/home');
  //   };
  //   return {
  //     lotterySettingForm,
  //     giftPondOptions,
  //     saveLotterySettings,
  //     cancelLotterySettings
  //   }
  // }