<template>
    <navigation-bar />
    <!-- intro -->
    <home-component />
    <!-- ad -->
    <bar-component />
    <!-- services -->
    <services-component :services="services" />
    <!-- pricing -->
    <pricing-component />
    <!-- footer -->
    <footer-component />
</template>

<script>

// Components
import NavigationBar from '../components/NavigationBar.vue';
import HomeComponent from '../components/home/HomeComponent.vue';
import BarComponent from '../components/home/BarComponent.vue';
import ServicesComponent from '../components/home/ServicesComponent.vue';
import PricingComponent from '../components/home/PricingComponent.vue';
import FooterComponent from '../components/home/FooterComponent.vue';

import APISvgSrc from "@/assets/api.svg";
import StorageSvgSrc from "@/assets/storage.svg";
import BusinessIntelSvgSrc from "@/assets/business-intel.svg";
import LogoSrc from "@/assets/review-logo.svg";

export default {
    name: 'HomeView',
    components: {
        NavigationBar,
        HomeComponent,
        BarComponent,
        ServicesComponent,
        PricingComponent,
        FooterComponent
    },
    data: () => {
        return {
            services: [
                {
                    name: "RESTful API",
                    icon: APISvgSrc,
                    description: "Use our services using a RESTful API, which includes numerous endpoints and simple implementation."
                },
                {
                    name: "Review Storage",
                    icon: StorageSvgSrc,
                    description: "Having issues storing reviews? Leave it to the professionals and allow us to do it inexpensively."
                },
                {
                    name: "Business Intelligence",
                    icon: BusinessIntelSvgSrc,
                    description: "Use our services to improve your decision making. We handle the data and information, you make the choices."
                }
            ],
            LogoSrc            
        }
    }
}

</script>

<style lang="scss" scoped>
.home {
    max-width: 1000px;
}

.v-row {
    margin: 0;
}

.v-container {
    padding-left: 10px;
    padding-right: 10px;
}
</style>