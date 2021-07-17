<template>
  <div id="chart">
    <apexchart type="bar" align="center" height="350" width="80%" :options="chartOptions" :series="series" v-if="myRender"></apexchart>

  </div>
</template>

<script>
export default {
  name: "HistogramRequestByTag",
  props: {
    labelsProcess: {
      type: Array, default: function () {
        return []
      }
    },
    countCallProcess: {
      type: Array, default: function () {
        return []
      }
    },
    doRefactor: null
  },
  data() {
    return {
      myRender: true,
      state: this.doRefactor,

      series: [{
        data: this.countCallProcess
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              console.log(chart, w, e)
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: this.labelsProcess,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        title: {
          text: 'Обращения по ключевым тэгам'
        }
      }
    }
  },
  methods: {
    printInput() {
      this.myRender = false
      this.$nextTick(() => {
        this.myRender = true
      })
    }
  },
  mounted() {
    this.$eventBus.$on('data-changed', this.printInput)
  },
}
</script>

<style scoped>

</style>