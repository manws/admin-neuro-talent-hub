<script>
export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        imgUrl: {
            type: String,
            default: "",
        },
    },
    render(h, context) {
        const { icon, title, imgUrl } = context.props;
        const vnodes = [];

        if (imgUrl && imgUrl.includes("http")) {
            console.log('[Sidebar,Item], imgUrl', imgUrl);
            vnodes.push(<img src={imgUrl} class={["img-style"]} />);
        } else if (icon) {
            if (icon.includes("el-icon")) {
                vnodes.push(<i class={[icon, "sub-el-icon"]} />);
            } else if (icon.indexOf("icon-") === 0) {
                let icon2 = icon.replace("icon-", "");
                vnodes.push(<icon-svg icon={icon2} />);
            } else {
                vnodes.push(<svg-icon icon-class={icon} />);
            }
        }

        if (title) {
            vnodes.push(<span slot="title">{title}</span>);
        }
        return vnodes;
    },
};
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}

.img-style {
    width: 20px;
    height: 20px;
    margin-right: 12px;
}
</style>
