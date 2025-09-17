<template>
    <div class="qrcode-container">
        <el-popover placement="left-end" width="100" trigger="hover">
            <i slot="reference" class="el-icon-s-grid" style="font-size: 24px; color: white; padding: 12px" />
            <div class="flex-style-column" style="align-items: center">
                <el-image style="width: 100px; height: 100px"
                          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1100078536,1544159746&fm=26&gp=0.jpg"></el-image>
                <p style="text-align: center">CTMS移动端</p>

                <el-image style="width: 100px; height: 100px; margin-top: 16px"
                          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=35939195,3291849540&fm=26&gp=0.jpg"></el-image>
                <p style="text-align: center">IWRS移动端</p>
            </div>
        </el-popover>
    </div>
</template>

<script></script>

<style scoped>
.qrcode-container {
    width: 48px;
    height: 48px;
    line-height: 48px;
    background-color: #1890ff;
    position: fixed;
    right: 0;
    bottom: 100px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    text-align: center;
    cursor: pointer;
}
</style>
