<template>
  <div class="example">
    <apexchart class="heat" align="center" width="80%" height="600" type="heatmap" :options="chartOptions"
               :series="series" ></apexchart>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TegnologyTypeServeringTypeRequest",
  props: {
    timeStart: null,
    timeEnd: null
  },
  data: function () {
    return {
      inputAssignments:
        [{
          name: String,
          data: [{
            x: String,
            y: Number
          }]
        }],
      myRender: false,

      chartOptions: {
        chart: {
          height: 600,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"],
        title: {
          text: 'Технологии и исполнители'
        },
      },
      series: []
    }
  },
  methods: {
    refresh(){
      axios.get('http://192.168.65.193:8000/api/statistic/assignment/', {
        params: {
          'start': Date.parse(this.timeStart),
          'end': Date.parse(this.timeEnd)
        }
      }).then(response => {
        this.inputAssignments = response.data

        if (this.inputAssignments.length > 0) {
          this.series = this.getter()
        } else {
          this.series = []
        }
        this.myRender = false
        this.$nextTick(() => {
          this.myRender = true
        })
      })
    },
    getter() {
      let objArr = []

      for (let i = 0; i < this.inputAssignments.length; i++) {
        let objDataArr = []
        for (let j = 0; j < this.inputAssignments[i].data.length; j++) {
          objDataArr.push({
            x: this.inputAssignments[i].data[j].x,
            y: this.inputAssignments[i].data[j].y
          })
        }
        objArr.push({
          name: this.inputAssignments[i].name,
          data:
            objDataArr
        })
      }

      return objArr
    },
  },
  mounted() {
    this.$eventBus.$on('refreshMatrix', this.refresh)
  },
}
</script>

<style scoped>
.heat {
  margin-top: 35px;
  max-height: 350px;
  min-width: 80%;
  position: center;
  align-self: center;
}
</style>