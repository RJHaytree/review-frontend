<template>
    <v-app>
        <toolbar-dashboard-component :pages="pages" />
        <v-main>
            <component v-bind:is="currentPage"></component>
        </v-main>
    </v-app>
</template>

<script>
import ToolbarDashboardComponent from '@/components/dashboard/ToolbarDashboardComponent.vue'
import DeveloperComponent from '@/components/dashboard/DeveloperComponent.vue'
import DocumentationComponent from '@/components/dashboard/DocumentationComponent.vue'
import HomeDashboardComponent from '@/components/dashboard/HomeDashboardComponent.vue'
import StatisticsComponent from '@/components/dashboard/StatisticsComponent.vue'
import { markRaw } from '@vue/reactivity'

const developer = markRaw(DeveloperComponent);
const documentation = markRaw(DocumentationComponent);
const home = markRaw(HomeDashboardComponent);
const statistics = markRaw(StatisticsComponent);

const pages = [home, documentation, developer, statistics];

export default {
    name: 'DashboardView',
    components: {
        ToolbarDashboardComponent
    },
    data: () => {
        return {
            currentPage: null,
            pages: [
                { name: 'dashboard', route: '/dashboard/', component: pages[0] },
                { name: 'documentation', route: '/dashboard/documentation/', component: pages[1] },
                { name: 'developer', route: '/dashboard/developer/', component: pages[2] },
                { name: 'statistics', route: '/dashboard/statistics/', component: pages[3] }
            ]
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    beforeMount: function() {
        this.$store.dispatch("getUser");
        this.$nextTick(() => {
            let currentRouteName = this.currentRouteName;
            let page = this.pages.filter(p => currentRouteName.includes(p.name));
            
            this.currentPage = page[0].component;
        })
    },
    watch: {
        $route (to) {
            let currentRouteName = this.currentRouteName;
            let page = this.pages.filter(p => currentRouteName.includes(p.name));

            if (page.length == 0) {
                this.$router.push(to.fullPath);
            }
            else if (page.length == 1) {
                this.currentPage = page[0].component;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-app, .v-main {
    height: 100vh;
    background-color: #f0f0f0;
}

.v-main {
    overflow-y: scroll;
}

.v-app {
    overflow-y: hidden;
}

</style>