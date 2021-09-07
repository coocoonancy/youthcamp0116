export type State = {
    giftPondOptions: Array<{ lottery_name: string; lottery_id: string; image_url: string; lottery_probability: number; }>
    giftPondList: Array<string>,
    initialOre: Number,
    giftUsedOres: Number
};
export interface CommitOptions {
    silent?: boolean;
    root?: boolean;
}
export interface Commit {
    (type: string, payload?: any, options?: CommitOptions): void;
}
const state: State = {
    // 可选的奖品池列表
    giftPondOptions: [],
    // 奖品池列表
    giftPondList: [],
    // 起始矿石数
    initialOre: 1000,
    // 抽奖耗费矿石数
    giftUsedOres: 22
    // 奖品中奖概率
};
export default {
    state,
    mutations: {
        SAVE_SETTINGS(state: State, payload: object) {
            state = { ...state, ...payload };
            console.log('SAVE_SETTINGS', state);
        }
    },
    actions: {
        saveSettings({ commit }: { commit: Commit }, payload: object) {
            console.log('saveSettings', payload);
            commit('SAVE_SETTINGS', payload);
        }
    },
    getters: {},
}
