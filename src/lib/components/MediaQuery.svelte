<script lang="ts">
    import { onMount } from 'svelte';

    export let query: string;

    let mql: MediaQueryList | undefined;
    let mqlListener: undefined | ((this: MediaQueryList, event: MediaQueryListEvent) => void);
    let wasMounted = false;
    let matches = false;

    onMount(() => {
        wasMounted = true;
        return removeActiveListener;
    });

    $: {
        if (wasMounted) {
            removeActiveListener();
            addNewListener(query);
        }
    }

    function addNewListener(query: string): void {
        mql = window.matchMedia(query);
        mqlListener = (v) => (matches = v.matches);
        mql.addEventListener('change', mqlListener);
        matches = mql.matches;
    }

    function removeActiveListener(): void {
        if (!mql || !mqlListener) return;
        mql.removeEventListener('change', mqlListener);
    }
</script>

<slot {matches} />
