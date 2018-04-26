<template lang="html">
<section class="content">
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">楼盘信息</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">楼盘名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">所在区域</label>
                    <div class=" col-sm-8 col-md-6">
                        <div class="row">
                            <div class="col-sm-4">
                                <select v-model="form.province" name="province" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.province') }" >
                                    <option v-for="item in region" :value="item.value" v-text="item.label"></option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <select v-model="form.city" name="city" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.city') }">
                                    <option v-for="item in cityList" :value="item.value" v-text="item.label"></option>
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <select v-model="form.district" name="district" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.district') }">
                                    <option v-for="item in districtList" :value="item.value" v-text="item.label"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">详细地址</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="address" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.address') }" v-model="form.address" placeholder="请输入">
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">使用场合</label>
                    <div class=" col-sm-8 col-md-6">
                        <!-- <select name="" id="" class="form-control">
                            <option value="">请选择</option>
                        </select> -->
						<textarea name="place" :class="{'form-control': true, 'is-error': errors.has('form.place') }" v-model="form.place" class="form-control" rows="3" placeholder="请输入"></textarea>
                    </div>
                </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <div class="col-sm-offset-2">
                    <button type="submit" class="btn btn-success">提交</button>
                </div>
            </div>
            <!-- /.box-footer -->
        </form>
    </div>
</section>
</template>

<script>
import region from '@/views/region.json'
export default {
  	data() {
	    return {
	      	region: region,
			cityList:[] ,
		  	districtList:[] ,
	      	form: {
		        name: '',
		        province: '',
		        city: '',
		        district: '',
		        address: '',
		        place: '',
      		}
    	}
  	},
  	created() {
    	if (this.$route.params.id) {
      		this.getData()
    	}
  	},
  	watch: {
	    'form.province': function(val){
			let index = this.region.findIndex(item=>item.value==val)
			if(index > -1){
				this.cityList = this.region[index].children
//				this.form.city = ''
//				this.form.district = ''
			}
	    },
		'form.city': function(val){
			let index = this.cityList.findIndex(item=>item.value==val)
			if(index > -1){
				this.districtList = this.cityList[index].children
//				this.form.district = ''
			}
	    },
  	},
  	methods: {
	    async getData() {
	      	let res = await this.$api.building({
	        	id: this.$route.params.id
	      	})
	      	this.form = res.data.data.list[0]
	    },
	    submit() {
	      	this.$validator.validateAll('form').then(async (result) => {
		        if (result) {
		          	let res = null
		          	if (this.$route.params.id) {
		            	res = await this.$api.updateBuilding(this.form)
		          	} else {
		            	res = await this.$api.addBuilding(this.form)
		          	}
		          	if (res.data.code == 0) {
		            	this.$notify({
		              	group: 'ok',
		              	title: '提示',
		              	text: '操作成功'
		            	});
		            	this.$router.back()
		          	}
		        }
	      	});
	    }
  }
}
</script>

<style lang="css">
</style>
