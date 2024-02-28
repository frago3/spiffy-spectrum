<script>
    export let type;
</script>

<button class="px-2.5 py-3 active:scale-90" on:click>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        transform={type == "prev" ? "rotate(180)" : "rotate(0)"}
        width="22"
        height="22"
        viewBox="0 0 80 80"
        fill="currentColor"
        stroke="currentColor"
    >
        <path
            d="M37.8667 38.4C38.9333 39.2 38.9333 40.8 37.8667 41.6L11.2 61.6C9.88153 62.5889 8 61.6481 8 60L8 20C8 18.3519 9.88153 17.4111 11.2 18.4L37.8667 38.4Z"
            stroke-width="4"
            stroke-linecap="square"
            stroke-linejoin="round"
        />
        <path
            d="M69.8667 38.4C70.9333 39.2 70.9333 40.8 69.8667 41.6L43.2 61.6C41.8815 62.5889 40 61.6481 40 60L40 20C40 18.3519 41.8815 17.4111 43.2 18.4L69.8667 38.4Z"
            stroke-width="4"
            stroke-linecap="square"
            stroke-linejoin="round"
        />
        <path
            d="M72 16L72 64"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</button>