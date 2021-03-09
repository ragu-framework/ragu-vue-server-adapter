<template>
  <div class="command-item">
    <div class="description-wrapper">
      <div class="number">
        <slot name="number"></slot>
      </div>
      <div class="description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="action" >
      <slot name="action"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommandItem',
}
</script>
<style scoped lang="scss">
.command-item {
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  grid-gap: 60px;
  margin: 60px 0;

  p:last-child {
    margin: 0;
  }

  .action {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }

  .description-wrapper {
    display: flex;
    align-items: center;

    .number {
      width: 40px;
      min-width: 40px;
      height: 40px;
      background: #000000;
      line-height: 40px;
      text-align: center;
      border-radius: 40px;
      margin-right: 16px;
    }
  }
}
</style>
