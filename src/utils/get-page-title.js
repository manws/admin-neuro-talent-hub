import defaultSettings from "@/settings"
import i18n from "@/lang"

const title = defaultSettings.title

export default function getPageTitle(key) {
    const hasKey = i18n.te(`route.${key}`)
    if (hasKey) {
        const pageName = i18n.t(`route.${key}`)
        return `${pageName} - ${title}`
    } else if (!key) {
        return `${title}`
    }
    return `${key} - ${title}`
}
