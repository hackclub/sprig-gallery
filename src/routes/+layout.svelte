<script>
  import { navigating } from '$app/stores';
  $: if ($navigating && typeof window !== 'undefined') {
    console.log('navigating');
    window._cleanup?.();
    window._cleanup = null;
  }
</script>

<slot />