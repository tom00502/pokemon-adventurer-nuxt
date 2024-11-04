<script setup>
const test = ref(1)
</script>
<template>
    <div
        class="card lightning / interactive masked"
        data-number="160"
        data-set="swsh12pt5"
        data-subtypes="basic"
        data-supertype="pokémon"
        data-rarity="rare secret"
        data-trainer-gallery="false"
        style="
            --pointer-x: 50.84879853703285%;
            --pointer-y: 44.80197941598966%;
            --pointer-from-center: 0.10533731902467286;
            --pointer-from-top: 0.4480197941598966;
            --pointer-from-left: 0.5084879853703285;
            --card-opacity: 0.10686944851768543;
            --rotate-x: 0deg;
            --rotate-y: 0deg;
            --background-x: 50.22066863208202%;
            --background-y: 48.23264449665708%;
            --card-scale: 1;
            --translate-x: 0px;
            --translate-y: 0px;
        "
    >
        <div class="card__translater">
            <button
                class="card__rotator"
                aria-label="Expand the Pokemon Card; Pikachu."
                tabindex="0"
            >
                <img
                    class="card__back"
                    src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                    alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
                    loading="lazy"
                    width="660"
                    height="921"
                />
                <div
                    class="card__front"
                    style="
                        --seedx: 0.16113413436224366;
                        --seedy: 0.10028402403317993;
                        --cosmosbg: 118px 128px;

                        --mask: url(https://poke-holo.b-cdn.net/foils/swsh12pt5/masks/upscaled/160_foil_etched_swsecret_2x.webp);
                        --foil: url(https://poke-holo.b-cdn.net/foils/swsh12pt5/foils/upscaled/160_foil_etched_swsecret_2x.webp);
                    "
                >
                    <img
                        src="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
                        alt="Front design of the Pikachu Pokemon Card, with the stats and info around the edge"
                        loading="lazy"
                        width="660"
                        height="921"
                    />
                    <div class="card__shine"></div>
                    <div class="card__glare"></div>
                </div>
            </button>
        </div>
    </div>
</template>
<style scoped>
:root {
    --mx: 50%;
    --my: 50%;
    --s: 1;
    --o: 0;
    --tx: 0px;
    --ty: 0px;
    --rx: 0deg;
    --ry: 0deg;
    --pos: 50% 50%;
    --posx: 50%;
    --posy: 50%;
    --hyp: 0;
}

.card {
    --radius: 4.55% / 3.5%;
    z-index: calc(var(--s) * 100);
    transform: translate3d(0, 0, 0.1px);
    will-change: transform, visibility;
    transform-style: preserve-3d;
}

.card.interacting {
    z-index: calc(var(--s) * 120);
}

.card.active .card__translater,
.card.active .card__rotator {
    touch-action: none;
}

.card__translater,
.card__rotator {
    display: grid;
    perspective: 600px;
    transform-origin: center;
    will-change: transform;
}

.card__translater {
    width: auto;
    position: relative;
    transform: translate3d(var(--tx), var(--ty), 0) scale(var(--s));
}

.card__rotator {
    --glow: #69d1e9;
    transform: rotateY(var(--rx)) rotateX(var(--ry));
    transform-style: preserve-3d;
    box-shadow: 0px 10px 20px -5px black;
    border-radius: var(--radius);
    outline: none;
    transition: box-shadow 0.4s ease, outline 0.2s ease;
}

.card.active .card__rotator {
    box-shadow: 0 0 10px 0px var(--glow), 0 0 10px 0px var(--glow), 0 0 30px 0px var(--glow);
}

.card__rotator:focus {
    box-shadow: 0 0 10px 0px var(--glow), 0 0 10px 0px var(--glow), 0 0 30px 0px var(--glow);
}

.card.active .card__rotator:focus {
    box-shadow: 0px 10px 30px 3px black;
}
</style>
