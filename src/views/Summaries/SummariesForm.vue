<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Resumos
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Voltar"
          route-path="/summaries"
        />
      </template>
      <template #cardText>
        <v-form @submit.prevent>
          <v-select
            v-model="disciplineId"
            :items="disciplines"
            label="Disciplina"
            no-data-text="Não existe nenhuma disciplina cadastrada"
            @change="getContentsByDiscipline"
          />
          <v-select
            v-model="contentId"
            :disabled="disciplineId === null"
            :error-messages="errors.content_id"
            :items="contents"
            label="Conteúdo"
            :messages="disciplineId === null ? contentIdHint : null"
            no-data-text="Não existe nenhum contéudo cadastrado para esta disciplina"
            @focus="errors.content_id = null"
          />
          <v-row :no-gutters="$vuetify.breakpoint.xsOnly">
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="title"
                :error-messages="errors.title"
                label="Resumo"
                @focus="errors.title = null"
                @keydown.enter="saveSummary"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="slug"
                disabled
                :error-messages="errors.slug"
                label="Slug"
              />
            </v-col>
          </v-row>
          <v-checkbox
            v-model="free"
            :error-messages="errors.free"
            label="Gratuito"
            @click="errors.free = null"
          />
        </v-form>
      </template>
      <template #cardActions>
        <ActionButton
          label="Salvar"
          @action="saveSummary"
        />
      </template>
    </CardLayout>
  </AuthenticatedLayout>
</template>

<script>
import slugify from 'slugify';

import ActionButton from '../../components/Buttons/ActionButton.vue';
import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';

import request from '../../mixins/request';

export default {
  name: 'SummariesForm',
  components: {
    ActionButton,
    AuthenticatedLayout,
    CardLayout,
    RouteButton,
  },
  mixins: [request],
  data: () => ({
    contentId: null,
    contentIdHint: 'Selecione uma disciplina para buscar seus respectivos conteúdos',
    contents: [],
    disciplineId: null,
    disciplines: [],
    errors: {},
    free: false,
    title: '',
  }),
  computed: {
    slug() {
      return slugify(this.title, { lower: true });
    },
    summaryId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.getDisciplines();

    if (this.summaryId) {
      this.getSummary();
    }
  },
  methods: {
    async getContentsByDiscipline() {
      this.contentId = null;
      this.contents = [];

      if (this.disciplineId) {
        const discipline = await this.request('get', `/disciplines/${this.disciplineId}`);

        if (discipline.contents && discipline.contents.length > 0) {
          this.contents = discipline.contents.reduce((acc, content) => [...acc, {
            text: content.title,
            value: content.id,
          }], [{ text: '', value: null }]);
        }
      }
    },
    async getDisciplines() {
      const disciplines = await this.request('get', '/disciplines');

      if (disciplines && disciplines.length > 0) {
        this.disciplines = disciplines.reduce((acc, discipline) => [...acc, {
          text: discipline.title,
          value: discipline.id,
        }], [{ text: '', value: null }]);
      }
    },
    async getSummary() {
      const summary = await this.request('get', `/summaries/${this.summaryId}`);

      if (summary) {
        this.disciplineId = summary.content.discipline.id;

        await this.getContentsByDiscipline();

        this.contentId = summary.content.id;
        this.title = summary.title;
        this.free = summary.free;
      }
    },
    async saveSummary() {
      this.errors = {};

      const data = {
        content_id: this.contentId,
        free: this.free,
        slug: this.slug,
        title: this.title,
      };

      const summary = this.summaryId
        ? await this.request('put', `/summaries/${this.summaryId}`, data)
        : await this.request('post', '/summaries', data);

      if (summary) {
        this.$router.push('/summaries');
      }
    },
  },
};
</script>
