<template>
  <div
    class="h-screen w-screen bg-gradient-to-br from-slate-900 to-gray-800 md:p-5"
  >
    <div
      class="relative h-full w-full overflow-hidden bg-slate-500 md:rounded-xl"
    >
      <Hero class="absolute top-5 z-10 w-full px-5 md:top-12 md:px-20" />

      <slot />
    </div>
  </div>
</template>

<script setup></script>
