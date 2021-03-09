<template>
  <div class="code-highlight">
    <pre><slot></slot></pre>
  </div>
</template>

<script>
export default {
  name: "GreenCodeHighlight"
}
</script>

<style scoped lang="scss">
  .code-highlight {
    background: rgba(65, 184, 131, 0.29);
    border-radius: 23px;
    padding: 20px;
    min-width: 100%;
    max-width: 100%;
    width: 100%;

    pre {
      font-family: "Source Code Pro", monospace;
      overflow: auto;
      min-width: 100%;
      max-width: 100%;
      width: 100%;
      margin: 0;
    }
  }
</style>
