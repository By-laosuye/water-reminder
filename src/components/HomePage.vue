<template>
  <div class="reminder-settings">
    <el-form label-position="top">
      <h1>喝水提醒小工具</h1>

      <el-form-item label="设置间隔（分钟）">
        <el-input v-model="intervalMinutes" type="number"></el-input>
      </el-form-item>

      <el-form-item label="任务">
        <el-input v-model="task" placeholder="例如：喝水"></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="requireConfirmation">是否需要确认？</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="isReminderActive" @click="startReminder">开始提醒</el-button>
        <el-button type="danger" :disabled="!isReminderActive" @click="stopReminder">停止提醒</el-button>
      </el-form-item>
    </el-form>

    <el-alert
      v-if="isReminderActive"
      :title="'下一次提醒还有：' + remainingTime + ' 秒'"
      type="info"
      show-icon>
    </el-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intervalMinutes: 60, // 默认提醒间隔为60分钟
      task: '喝水', // 默认任务
      requireConfirmation: false, // 是否需要弹窗确认
      remainingTime: 0, // 剩余时间（秒）
      timer: null, // 用于存储定时器引用
      isReminderActive: false, // 用于控制按钮状态
    };
  },
  methods: {
    // 启动提醒
    startReminder() {
      if (this.intervalMinutes > 0) {
        this.remainingTime = this.intervalMinutes * 60; // 将分钟转换为秒
        this.isReminderActive = true; // 设置为活动状态

        this.updateRemainingTime(); // 启动更新时间
        this.timer = setTimeout(this.remind, this.intervalMinutes * 60000); // 设置提醒
      }
    },
    // 停止提醒
    stopReminder() {
      clearTimeout(this.timer); // 清除定时器
      this.remainingTime = 0; // 重置剩余时间
      this.isReminderActive = false; // 结束提醒活动状态
    },
    // 提醒用户
    remind() {
      if (this.requireConfirmation) {
        this.$confirm(`提醒：${this.task}`, '任务提醒', {
          confirmButtonText: '知道了！',
          cancelButtonText: '稍后提醒',
          type: 'info',
        }).then(() => {
          this.startReminder(); // 确认后继续提醒
        }).catch(() => {
          this.isReminderActive = false; // 用户选择稍后提醒时，重置按钮状态
        });
      } else {
        this.$notify({
          title: '提醒',
          message: this.task,
          type: 'info',
        });
        this.startReminder(); // 无需确认时直接继续提醒
      }
    },
    // 更新时间
    updateRemainingTime() {
      const interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--; // 每秒减少实际剩余时间
        } else {
          clearInterval(interval); // 计时器结束后清除
          this.isReminderActive = false; // 结束提醒活动状态
        }
      }, 1000); // 每秒更新一次
    },
  },
  beforeUnmount() {
    // 组件销毁时清除所有定时器
    clearTimeout(this.timer);
  },
};
</script>

<style>
.reminder-settings {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* 背景色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>
