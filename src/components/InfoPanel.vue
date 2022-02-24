<template>
    <div class="error">
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        props: 
            ['message']
        ,
    }
</script>

<style lang="scss" scoped>
.error {
    background-color:rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    padding: 0rem 3rem;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 341px)  {
    .error {
        padding: 0rem 2rem;
    }
}

@media (max-width: 307px)  {
    .error {
        padding: 0rem 1rem;
        font-size: 1rem;
    }
}

@media (max-width: 300px)  {
    .error {
        font-size: 1rem;
    }
}
</style>