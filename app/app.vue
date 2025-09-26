<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Container de Notificações -->
    <NotificationContainer />
  </div>
</template>

<script setup>
// Import do componente de notificações
import NotificationContainer from '~/components/NotificationContainer.vue'
</script>
