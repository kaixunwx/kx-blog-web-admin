import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber, tagsView } = defaultSettings


const settings = {
    state: {
        theme: variables.theme,
        showSettings: false,
        sidebarLogo: sidebarLogo,
        fixedHeader: fixedHeader,
        showFooter: showFooter,
        footerTxt: footerTxt,
        caseNumber: caseNumber,
        uniqueOpened: uniqueOpened,
        tagsView: tagsView,
    },
    mutations: {
        CHANGE_SETTING: (state, {key, value}) => {
            if (state.hasOwnProperty(key)) {
                state[key] = value
            }
        }
    },
    actions: {
        changeSetting({commit}, data) {
            commit('CHANGE_SETTING', data)
        }
    }
}

export default settings

