<h2 class="section-name"><slot /></h2>

<style>
    .section-name {
        letter-spacing: -0.0125em;
        margin: 0;
        margin-bottom: 1rem;
        padding-left: 2.75rem;
        position: relative;
    }

    .section-name::before {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        background: var(--primary-color);
        width: 2rem;
        height: 2rem;
        transform: translateY(-50%);
        border-radius: 2rem;
    }

    .section-name::after {
        position: absolute;
        content: '';
        top: 50%;
        left: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        transform: translateY(-50%);
        background-image: var(--section-icon);
        background-repeat: no-repeat;
        background-size: contain;
        fill: #fff;
    }
</style>
