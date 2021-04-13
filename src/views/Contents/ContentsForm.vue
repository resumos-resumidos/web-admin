<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Contéudos
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Voltar"
          route-path="/contents"
        />
      </template>
      <template #cardText>
        <v-form @submit.prevent>
          <v-select
            v-model="disciplineId"
            :error-messages="errors.discipline_id"
            :items="disciplines"
            label="Disciplina"
            no-data-text="Não existe nenhuma disciplina cadastrada"
            @focus="errors.discipline_id = null"
          />
          <v-row :no-gutters="$vuetify.breakpoint.xsOnly">
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="title"
                :error-messages="errors.title"
                label="Conteúdo"
                @focus="errors.title = null"
                @keydown.enter="saveContent"
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
        </v-form>
      </template>
      <template #cardActions>
        <ActionButton
          label="Salvar"
          @action="saveContent"
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
  name: 'ContentsForm',
  components: {
    ActionButton,
    AuthenticatedLayout,
    CardLayout,
    RouteButton,
  },
  mixins: [request],
  data: () => ({
    disciplineId: null,
    disciplines: [],
    errors: {},
    title: '',
  }),
  computed: {
    slug() {
      return slugify(this.title, { lower: true });
    },
  },
  async created() {
    this.getDisciplines();

    if (this.$route.params.slug) {
      this.getContent();
    }
  },
  methods: {
    async getContent() {
      const content = await this.request('get', `/contents/${this.$route.params.slug}`);

      if (content) {
        this.disciplineId = content.discipline_id;
        this.title = content.title;
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
    async saveContent() {
      this.errors = {};

      const data = {
        discipline_id: this.disciplineId,
        slug: this.slug,
        title: this.title,
      };

      const content = this.$route.params.slug
        ? await this.request('put', `/contents/${this.$route.params.slug}`, data)
        : await this.request('post', '/contents', data);

      if (content) {
        this.$router.push('/contents');
      }
    },
  },
};
</script>
