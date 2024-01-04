import { defineStore } from 'pinia'

import { fetchBaseCode } from '@/api/common'

export const useBaseCodeStore = defineStore('baseCode', {
  state: () => {
    return {
      baseCode: {},
      initType: [
        'INSUTYPE',
        'BANK_TYPE_CODE',
        'MED_TYPE',
        'PAY_LOC',
        'HOSP_LV',
        'MEDINSLV',
        'PSN_CERT_TYPE',
        'ACCT_INCEXPD_TYPE',
        'PSN_INSU_STAS',
        'NATY',
        'GEND',
        'CLCT_FLAG',
        'CHK_STAS',
        'PSN_TYPE',
        'CLCT_TYPE',
        'resd_Natu',
        'educ',
        'polstas',
        'mrg_Stas',
        'hlcon',
        'admdut',
        'pro_Tech_Duty_Lv',
        'nat_Prfs_Qua_Lv',
        'AGNTER_RLTS',
        'FIXMEDINS_TYPE',
        'FNS_STAS',
        'vali_Flag',
        'servitem_Type',
        'PRODPLAC_TYPE'
      ]
    }
  },
  actions: {
    async setBaseCode(type: string) {
      if (this.baseCode[type]) return

      try {
        const { data } = await fetchBaseCode({ type })

        this.baseCode[type] = data
      } catch (err) {
        console.log(err)
      }
    },
    setInitBaseCode() {
      this.initType.map((item) => this.setBaseCode(item))
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['baseCode']
      }
    ]
  }
})
