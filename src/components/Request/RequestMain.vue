<template>
  <div>
    <b-row>
      <b-col class="instruction_calendar">
        Выберите формат
      </b-col>
      <b-col>
        <div class="calendars mt-2">
          <p>Custom date format:</p>
          <b-calendar
              v-model="calendarValue1"
              @context="onContextCalendar1"
              :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit'}"
              selectDate="2020-12-31T20:00:00.000Z"
              locale="ru"
          ></b-calendar>
        </div>
      </b-col>
      <b-col>
        <div class="calendars">
          <p class="mt-3">Short date format:</p>
          <b-calendar
              v-model="calendarValue2"
              @context="onContextCalendar2"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="ru"
          ></b-calendar>
        </div>
        <b-button v-b-modal.modal-1 hidden>Launch demo modal</b-button>
        <b-modal id="modal-1" title="BootstrapVue">
          <p class="my-4">Hello from modal!</p>
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <first-card :totalOrderIncomesInPeriod="totalOrderIncomesInPeriod" :totalOrderDone="totalOrderDone"
                    :totalUnprovedOrder="totalUnprovedOrder" :minTimeService="minTimeService"
                    :maxTimeService="maxTimeService" :totalOrderIncorrectSLA="totalOrderIncorrectSLA"
                    :totalOrderEarlySLA="totalOrderEarlySLA" :averageOrderServise="averageOrderServise"
                    :averageLateless="averageLateless" :summaryLateness="summaryLateness"
        ></first-card>
      </b-col>
    </b-row>
    <b-row>
      <histogram-request-by-tag :labelsProcess="labelsProcess"
                                :countCallProcess="countCallProcess"
                                :doRefactor="doRefactor"></histogram-request-by-tag>
    </b-row>
    <b-row>
      <tegnology-type-servering-type-request :timeStart="timeStart"
                                             :timeEnd="timeEnd"></tegnology-type-servering-type-request>
    </b-row>
  </div>
</template>

<script>
import HistogramRequestByTag from "./TypeGraph/HistogramRequestByTag"
import TegnologyTypeServeringTypeRequest from "./TypeGraph/TegnologyTypeServeringTypeRequest"
import firstCard from "./TypeGraph/firstCard"

import axios from "axios";
import moment from "moment";

export default {
  name: "RequestMain",
  components: {
    // eslint-disable-next-line vue/no-unused-components,no-undef
    HistogramRequestByTag,
    // eslint-disable-next-line vue/no-unused-components,no-undef
    TegnologyTypeServeringTypeRequest,
    // eslint-disable-next-line vue/no-unused-components,no-undef
    firstCard
  },
  data() {
    return {
      //calendar values to review
      calendarValue1: '',
      calendar1Context: null,
      timeStart: null,
      calendarValue2: '',
      calendar2Context: null,
      timeEnd: null,

      ///*data from server*///
      //data order
      inputDataOrder: [this.Order],
      //data Task
      inputDataTask: [this.Task],

      inputAssignmentsTest: [this.Assignment],

      //data Resource
      inputResource: [this.Resource],

      //1_1
      storageInputsOrderEmergency: [],
      totalOrderIncomesInPeriod: null,

      //1_2
      totalOrderDone: null,

      //1_3
      totalUnprovedOrder: null,

      //1_4
      totalOrderIncorrectSLA: null,

      //1_5
      totalOrderEarlySLA: null,

      //1-6
      averageOrderServise: null,

      //1-7
      minTimeService: null,
      maxTimeService: null,

      //1-8
      averageLateless: null,

      //1-9
      summaryLateness: null,

      //1-10
      labelsProcess: [String],
      countCallProcess: [Number],
      doRefactor: Boolean,
      frequencyProcess: new Map(),

      parentTask: [Number],

      Order: {
        comment: String,
        deadline: Number,
        emerging: Number,
        id: Number,
        label: String,
        priority: Number,
        processUri: this.process,
        product: Object,
        productUri: Object,
        result: Object,
        status: String,
        strategy: Object,
        timeIncome: Number
      },

      Task: {
        assignments: [Object],
        children: [this.Task],
        comment: String,
        duration: Number,
        factEnd: Number,
        factStart: Number,
        factTimeExist: Number,
        id: Number,
        order: this.Order,
        parent: this.Task,
        planEnd: Number,
        planStart: Number,
        requirements: [Object],
        sourceSequences: [Object],
        text: String,
        uri: String,
        withSequences: [Object]
      },
      process: {
        id: Number,
        label: String,
        uri: String
      },
      Assignment: {
        id: Number,
        label: String,
        task: this.Task,
        resource: Number,
        product: Object,
        relationsType: Object,
        startTime: Number,
        endTime: Number,
        amount: Number,
        isFixed: Boolean
      },
      Resource: {
        calendars: Object,
        conceptType: Object,
        constraints: Object,
        group: Object,
        id: Number,
        label: String,
        properties: Object
      }
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
      const now = new Date()
      this.calendarValue1 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      this.changeToNumber()
    },
    onContextCalendar1(ctx1) {
      this.calendar1Context = ctx1
      this.changeToNumber()
    },
    onContextCalendar2(ctx2) {
      this.calendar2Context = ctx2
      this.changeToNumber()
    },
    changeToNumber() {
      this.timeStart = moment(String(this.calendarValue1)).format('MM-DD-YYYY')
      this.timeEnd = moment(String(this.calendarValue2)).format('MM-DD-YYYY')
      this.sender()
    },
    sender() {
      if (Date.parse(this.timeStart) > Date.parse(this.timeEnd)) {
        this.showModal()
      } else {
        axios.all([
          this.requestOrder(),
          this.requestTask(),
          this.requestResource()
        ]).then(axios.spread((orders, tasks, resource) => {
          this.inputDataOrder = orders.data
          this.calkIncomesOrder()

          this.inputDataTask = tasks.data
          this.calkTaskWork()

          this.inputResource = resource.data

          this.calkMatrix()

          this.calkOrderAverage()
          this.countProcessHistogram()
        }))
      }
    },
    requestOrder() {
      return axios.get('http://192.168.65.193:8000/api/statistic/orderIncomes/')
    },
    requestTask() {
      return axios.get('http://192.168.65.193:8000/api/statistic/task/')
    },
    requestResource() {
      return axios.get('http://192.168.65.193:8000/api/statistic/resource/')
    },
    calkIncomesOrder() {
      this.totalOrderIncomesInPeriod = 0
      this.totalOrderDone = 0
      this.totalUnprovedOrder = 0

      for (let i = 0; i < this.inputDataOrder.length; i++) {
        this.storageInputsOrderEmergency[i] = this.inputDataOrder[i].emerging

        if (this.storageInputsOrderEmergency[i] > Date.parse(this.timeStart)
            && this.storageInputsOrderEmergency[i] < Date.parse(this.timeEnd)) {
          this.totalOrderIncomesInPeriod++
          if (String(this.inputDataOrder[i].status).valueOf() !== String('Created').valueOf()) {
            this.totalOrderDone++
          }
          if (String(this.inputDataOrder[i].status).valueOf() === String('unproveded').valueOf()) {
            this.totalUnprovedOrder++
          }
        }
      }
    },
    calkTaskWork() {
      this.totalOrderIncorrectSLA = 0

      let arrayAlreadyOver = []
      let currentIndex = 0

      for (let i = 0; i < this.inputDataOrder.length; i++) {
        for (let j = 0; j < this.inputDataTask.length; j++) {
          if (this.inputDataOrder[i] === this.inputDataTask[j].order.id
              && this.inputDataTask.duration > this.inputDataOrder.deadline
              && this.storageInputsOrderEmergency[i] > Date.parse(this.timeStart)
              && this.storageInputsOrderEmergency[i] < Date.parse(this.timeEnd)) {
            if (!arrayAlreadyOver.includes(this.inputDataOrder[i].id)) {
              this.totalOrderIncorrectSLA++
              arrayAlreadyOver[currentIndex] = this.inputDataOrder[i].id
              currentIndex++
            }
          }
        }
      }
      this.totalOrderEarlySLA = this.totalOrderIncomesInPeriod - this.totalOrderIncorrectSLA
    },
    calkOrderAverage() {
      let averageEvery = new Map()

      //fill map corrected data
      for (let i = 0; i < this.inputDataOrder.length; i++) {
        if (this.storageInputsOrderEmergency[i] > Date.parse(this.timeStart)
            && this.storageInputsOrderEmergency[i] < Date.parse(this.timeEnd)
            && String(this.inputDataOrder[i].status).valueOf() !== String('planing').valueOf()) {
          averageEvery.set(this.inputDataOrder[i].id, this.inputDataOrder[i].emerging)
        }
      }
      let dataWithFactTime = 0
      //calculate working time
      for (let i = 0; i < this.inputDataTask.length; i++) {
        for (const averageEveryElement of averageEvery.keys()) {
          if (this.inputDataTask[i].order.id === averageEveryElement
              && this.inputDataTask[i].factStart !== null
              && this.inputDataTask[i].factEnd !== null) {
            const tmpAwaiting = this.inputDataTask[i].factStart - averageEvery.get(averageEveryElement)
            const tmpWorking = this.inputDataTask[i].factEnd - this.inputDataTask[i].factStart
            averageEvery.set(averageEveryElement, averageEvery.get(averageEveryElement) + tmpWorking + tmpAwaiting)

            dataWithFactTime++
          } else {
            if (this.inputDataTask[i].order === averageEveryElement
                && this.inputDataTask[i].factStart !== null
                && this.inputDataTask[i].factEnd !== null) {
              const tmpAwaiting = this.inputDataTask[i].factStart - averageEvery.get(averageEveryElement)
              const tmpWorking = this.inputDataTask[i].factEnd - this.inputDataTask[i].factStart
              averageEvery.set(averageEveryElement, averageEvery.get(averageEveryElement) + tmpWorking + tmpAwaiting)

              dataWithFactTime++
            }
          }
        }
      }

      this.calkLateness(averageEvery)

      //- start time
      for (let i = 0; i < this.inputDataOrder.length; i++) {
        for (const averageEveryElement of averageEvery.keys()) {
          if (this.inputDataTask[i].id === averageEveryElement) {
            averageEvery.set(averageEveryElement, averageEvery.get(averageEveryElement) - this.inputDataOrder[i].emerging)
          }
        }
      }

      this.calkMinMaxCallRequest(averageEvery)

      let summary = 0
      for (const averageEveryElement of averageEvery.values()) {
        summary += averageEveryElement
      }

      if (dataWithFactTime !== 0) {
        this.averageOrderServise = summary / dataWithFactTime
      } else {
        this.averageOrderServise = 0
      }

      this.averageOrderServise = Math.round(this.averageOrderServise / 36000000)
    },
    calkLateness(averageEvery) {
      let deadlinesOrder = new Map()
      let averageDeadlines = new Map()
      for (let i = 0; i < this.inputDataOrder.length; i++) {
        deadlinesOrder.set(this.inputDataOrder[i].id, this.inputDataOrder[i].deadline)
        averageDeadlines.set(this.inputDataOrder[i].id, 0)
      }

      let countLateness = 0
      let summaryLateness = 0
      for (const deadlinesOrderElement of deadlinesOrder.entries()) {
        for (const averageEveryElement of averageEvery.entries()) {
          if (deadlinesOrderElement[0] === averageEveryElement[0]) {
            if (averageEveryElement[1] > deadlinesOrderElement[1]) {
              averageDeadlines.set(deadlinesOrderElement[0], averageEveryElement[1] - deadlinesOrderElement[1])
              countLateness++
              summaryLateness += averageEveryElement[1] - deadlinesOrderElement[1]
            } else {
              averageDeadlines.set(deadlinesOrderElement[0], 0)
            }
          }
        }
      }

      if (countLateness !== 0) {
        this.averageLateless = Math.round((summaryLateness / countLateness) / 36000000)
      } else {
        this.averageLateless = 'Обращения в данный момент ещё не обработаны'
      }

      //1-9
      this.summaryLateness = Math.round(summaryLateness / 36000000)
    },
    calkMinMaxCallRequest(averageEvery) {
      let minTimeService = new Map()
      minTimeService = averageEvery

      let min = Number.MAX_VALUE
      let max = Number.MIN_VALUE
      for (const Element of minTimeService.values()) {
        if (Element !== 0) {
          if (Element < min) {
            min = Element
          }
          if (Element > max) {
            max = Element
          }
        }
      }

      if (min === Number.MAX_VALUE || max === Number.MIN_VALUE) {
        this.minTimeService = 'Обращения в данный момент ещё не обработаны'
        this.maxTimeService = 'Обращения в данный момент ещё не обработаны'
      } else {
        this.minTimeService = Math.round(min / 36000000)
        this.maxTimeService = Math.round(max / 36000000)
      }
    },
    countProcessHistogram() {
      this.doRefactor = false

      for (let i = 0; i < this.labelsProcess.length; i++) {
        this.labelsProcess[i] = ' '
        this.countCallProcess[i] = 0
      }

      for (let i = 0; i < this.inputDataOrder.length; i++) {
        if (this.storageInputsOrderEmergency[i] > Date.parse(this.timeStart)
            && this.storageInputsOrderEmergency[i] < Date.parse(this.timeEnd)) {
          this.frequencyProcess.set(this.inputDataOrder[i].processUri.label, 0)
        }
      }

      for (let i = 0; i < this.inputDataOrder.length; i++) {
        for (const frequencyProcessElem of this.frequencyProcess.entries()) {
          if (this.storageInputsOrderEmergency[i] > Date.parse(this.timeStart)
              && this.storageInputsOrderEmergency[i] < Date.parse(this.timeEnd)
              && String(frequencyProcessElem[0]).valueOf() === String(this.inputDataOrder[i].processUri.label).valueOf()) {
            this.frequencyProcess.set(frequencyProcessElem[0], frequencyProcessElem[1] + 1)
          }
        }
      }

      if (this.frequencyProcess.size === 0) {
        for (let i = 0; i < this.labelsProcess.length; i++) {
          this.labelsProcess[i] = ''
          this.countCallProcess[i] = 0
        }
      } else {

        let index = 0
        for (const frequencyProcessElem of this.frequencyProcess.entries()) {
          this.labelsProcess[index] = frequencyProcessElem[0]
          this.countCallProcess[index] = frequencyProcessElem[1]
          index++
        }

        this.doRefactor = true
      }
      this.$eventBus.$emit('data-changed')
      this.frequencyProcess.clear()
    },
    calkMatrix() {
      this.$eventBus.$emit('refreshMatrix')
    }
  },
  mounted() {
    const now = new Date()
    this.calendarValue1 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    this.calendarValue2 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    this.changeToNumber()
  }
}
</script>

<style scoped>
.instruction_calendar {
  margin-top: 35px;
  margin-left: 17px;
}
</style>