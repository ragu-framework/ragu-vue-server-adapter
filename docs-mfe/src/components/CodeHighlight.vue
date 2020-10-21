<template>
  <div class="code-highlight">
    <pre><slot></slot></pre>
  </div>
</template>

<script>
export default {
  name: "CodeHighlight"
}
</script>

<style scoped>
  .code-highlight {
    background: #2B3332;
    color: #FFFFFF;
    padding: 1.5rem 0.75rem;
    font-family: 'Source Code Pro', monospace;
    overflow: auto;
    display: block;
    box-sizing: border-box;
    max-width: 100%;
    border-radius: 10px;
    white-space: nowrap;
  }
</style>
