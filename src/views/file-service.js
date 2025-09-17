import store from "@/store"
import { Notification } from "element-ui"

export const showPDF = (formName) => {
    store
        .dispatch("handleDownload", {
            url: `/api/v1/showCRF/${store.getters.project.projectDB}/${formName}`,
            param: { formName: formName },
        })
        .then((resp) => {
            const link = document.createElement("a")
            const blob = new Blob([resp], { type: "application/pdf;charset=utf-8" })

            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", formName + ".pdf")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
        .catch((error) => {
            Notification.error({ title: "错误", desc: "网络连接错误" })
            console.dir(error)
        });
};

export const exportExcelList = (formId, formName, params) => {
    store
        .dispatch("handleDownload", {
            url: `/api/v1/download-list/${store.getters.project.projectDB}/${formId}`,
            param: params,
            config: {
                responseType: "blob",
            },
        })
        .then((resp) => {
            const link = document.createElement("a")
            const blob = new Blob([resp], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", formName + ".xlsx")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
        .catch((error) => {
            Notification.error({ title: "错误", desc: "网络连接错误" })
        });
};

export const exportExcelAudit = (
    formId,
    recordId,
    formName,
    params,
    configs
) => {
    store
        .dispatch("handleDownload", {
            url: `/api/v1/download-audit/${store.getters.project.projectDB}/${formId}/${recordId}`,
            param: params,
            config: {
                responseType: "blob",
            },
        })
        .then((resp) => {
            const link = document.createElement("a")
            const blob = new Blob([resp], { type: "application/vnd.ms-excel" })
            link.style.display = "none"
            link.href = URL.createObjectURL(blob)

            link.setAttribute("download", formName + ".xlsx")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
        .catch((error) => {
            Notification.error({ title: "错误", desc: "网络连接错误" })
        });
};
