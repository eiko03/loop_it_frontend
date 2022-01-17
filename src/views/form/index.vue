<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="carRules" label-width="120px">
      <el-form-item label="Brand name">
        <el-input v-model="form.brand" />
      </el-form-item>
      <el-form-item label="Model name">
        <el-input v-model="form.model" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="this.$route.query.id" :loading="loading" type="primary" @click="onSubmit">Update</el-button>
        <el-button v-else :loading="loading" type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from '@/router'

export default {
  data() {
    const validateModel = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Model can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateBrand = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Brand can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      form: {
        brand: '',
        model: ''
      },
      carRules: {
        model: [{ required: true, trigger: 'blur', validator: validateModel }],
        brand: [{ required: true, trigger: 'blur', validator: validateBrand }]
      },
      loading: false,
      id: null
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.$store.dispatch('settings/carGet', this.id).then((res) => {
        this.form = res
      })
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          this.loading = true
          if (this.id) {
            this.$store.dispatch('settings/carUpdate', { ...this.form, 'id': this.id }).then(() => {
              router.push('/')
            })
          } else {
            this.$store.dispatch('settings/carCreate', this.form).then(() => {
              router.push('/')
            })
          }
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

