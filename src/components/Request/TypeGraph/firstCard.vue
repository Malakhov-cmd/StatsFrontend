<template>
  <v-container fluid>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            class="mb-2"
            color="indigo darken-5"
            light
            flat
        >
          <v-toolbar-title>Показатели для ГВЦ cо стороны обращений заданного типа</v-toolbar-title>
        </v-toolbar>
      </template>

      <template>
        <v-row>
          <v-col
          >
            <v-card min-width="400px">
              <v-card-title class="subheading font-weight-bold">
                Обращения
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content> Число пришедших обращений за выбранный период период:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ totalOrderIncomesInPeriod }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content> Число обработанных обращений за выбранный период период:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ totalOrderDone }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Число обращений за период, которые не удалось разместить:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ totalUnprovedOrder }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content> Минимальное время обработки одного обращения:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ minTimeService }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> Максимальное время обработки одного обращения:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ maxTimeService }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col
          >
            <v-card min-width="400px">
              <v-card-title class="subheading font-weight-bold">
                Обращения
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>  Число обращений за период, которые нарушили SLA:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ totalOrderIncorrectSLA }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>  Число обращений за период, которые выполнены раньше SLA:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ totalOrderEarlySLA }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content> Среднее время обработки одного обращения:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ averageOrderServise }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>  Среднее время нарушения (запаздывания) от срока по SLA:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ averageLateless }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> Суммарное время нарушения SLA:</v-list-item-content>
                  <v-list-item-content class="answers">
                    {{ summaryLateness }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-toolbar
            class="mt-2"
            color="indigo"
            light
            flat
        >
          <v-toolbar-title class="subheading">
            Графическое Представление
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: "firstCard",
  props: ['totalOrderIncomesInPeriod', 'totalOrderDone', 'totalUnprovedOrder', 'minTimeService',
    'maxTimeService', 'totalOrderIncorrectSLA', 'totalOrderEarlySLA', 'averageOrderServise',
    'averageLateless', 'summaryLateness'],
  data: () => ({
    itemsPerPage: 4,
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%',
      },
    ],
  }),
}
</script>

<style scoped>
.answers {
  display: block;
  margin-left: auto;
  margin-right: auto
}
</style>