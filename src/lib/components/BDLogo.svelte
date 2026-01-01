<script>
  export let size = 46;
</script>

<style>
:global(:root) {
  --bd-red: #e60000;
  --bd-dark: #141414;
  --bd-white: #ffffff;
}
.logo-wrap {
  display: flex;
  align-items: center;
}
.block {
  display: inline-flex;
  background: var(--bd-red);
  color: var(--bd-white);
  font-family: "Times New Roman", serif;
  font-size: calc(var(--size) * 1px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  padding: 4px 8px;
  border-right: 4px solid var(--bd-dark);
}
.day {
  background: var(--bd-dark);
  padding: 4px 12px;
}
</style>

<div class="logo-wrap" style="--size:{size}">
  <span class="block">Business</span>
  <span class="day">Day</span>
</div>
