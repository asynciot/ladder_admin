<template lang="html">
	<!-- Main content -->
        <section class="content">

            <div class="box">
                <!--<div class="box-header with-border">-->
                <!--<h4 class="box-title">请从下面列表选择电梯</h4>-->
                <!--</div>-->
                <div class="box-body">
                    <div class="row">
                        <div class="col-sm-6">
                            占用区域
                        </div>
                        <div class="col-sm-6">
                            <div class="center-block" style="width: 400px">
                                <table class="state-table table table-bordered">
                                    <tr>
                                        <td class="on">
                                            <div class="icon"><i class="fa fa-wrench"></i></div>
                                            <p>检修</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-warning"></i></div>
                                            <p>故障</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-times-circle"></i></div>
                                            <p>超载</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="icon"><i class="fa fa-group"></i></div>
                                            <p>满载</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-fire-extinguisher"></i></div>
                                            <p>消防</p>
                                        </td>
                                        <td class="on">
                                            <div class="icon"><i class="fa fa-unlock-alt"></i></div>
                                            <p>锁体</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="icon"><i class="fa fa-building-o"></i></div>
                                            <p>门区</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-exclamation"></i></div>
                                            <p>困人</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-exclamation-circle"></i></div>
                                            <p>串口异常</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="icon"><i class="fa fa-building-o"></i></div>
                                            <p>门区</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-exclamation"></i></div>
                                            <p>困人</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-exclamation-circle"></i></div>
                                            <p>串口异常</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="icon"><i class="fa fa-unlock"></i></div>
                                            <p>控制器密码</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-battery-full"></i></div>
                                            <p>供电状态</p>
                                        </td>
                                        <td>
                                            <div class="icon"><i class="fa fa-commenting"></i></div>
                                            <p>乘客信号</p>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                            <div class="center-block" style="width: 400px">
                                <p class="text-center">系统运行时间：300分钟 运行次数：1254次</p>
                                <table class="table text-center">
                                    <tr>
                                        <td>
                                            <button class="btn btn-default">端子状态</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-default">电梯参数</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-default">电梯事件</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button class="btn btn-default">电梯档案</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-default">高级功能</button>
                                        </td>
                                        <td>
                                            <button class="btn btn-default">同步楼层</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- /.box-body -->

            </div>
            <!-- /.box -->

        </section>
</template>

<script>
export default {
	mounted(){
	}
}
</script>

<style lang="css">
</style>
