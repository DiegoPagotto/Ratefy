<template>
    <div class="mt-3">
        <label class="toggleSwitch">
            <input type="checkbox" checked @change="toggleSwitch" />
            <a></a>
            <span>
                <span class="left-span mt-3">Global</span>
                <span class="right-span mt-3">Nacional</span>
            </span>
        </label>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedOption: "N",
        };
    },
    methods: {
        toggleSwitch() {
            this.selectedOption = this.selectedOption === "G" ? "N" : "G";
            this.$emit("option-changed", this.selectedOption);
        },
    },
};
</script>

<style scoped>
.toggleSwitch span span {
    display: none;
}

.toggleSwitch {
    display: inline-block;
    position: relative;
    overflow: visible;
    padding: 0;
    cursor: pointer;
    width: 400px;
    background-color: #212121;
    border-radius: 5px;
    height: 60px;
}

.toggleSwitch label,
.toggleSwitch>span {
    line-height: 20px;
    font-size: 2rem;
    height: 60px;
    vertical-align: middle;
}

.toggleSwitch input:focus~a,
.toggleSwitch input:focus+label {
    outline: none;
}

.toggleSwitch label {
    position: relative;
    z-index: 3;
    display: block;
    width: 100%;
}

.toggleSwitch input {
    position: absolute;
    opacity: 0;
    z-index: 5;
}

.toggleSwitch>span {
    position: absolute;
    left: 0;
    width: calc(100% - 6px);
    margin: 0;
    text-align: left;
    white-space: nowrap;
    margin: 0 3px;
}

.toggleSwitch>span span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 50%;
    margin-left: 50px;
    text-align: left;
    font-size: 0.9em;
    width: auto;
    left: 0;
    top: -1px;
    opacity: 1;
    width: 40%;
    text-align: center;
    line-height: 34px;
}

.toggleSwitch a {
    position: absolute;
    right: 50%;
    z-index: 4;
    display: block;
    top: 3px;
    bottom: 3px;
    padding: 0;
    left: 3px;
    width: 50%;
    background-color: #1db954;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.toggleSwitch>span span:first-of-type {
    color: #212121;
    opacity: 1;
    left: 0;
    margin: 0;
    width: 50%;
}

.toggleSwitch>span span:last-of-type {
    left: auto;
    right: 0;
    color: #1db954;
    margin: 0;
    width: 50%;
}

.toggleSwitch>span:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: -2px;
    border-radius: 30px;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
}

.toggleSwitch input:checked~a {
    left: calc(50% - 3px);
}

.toggleSwitch input:checked~span span:first-of-type {
    left: 0;
    color: #1db954;
}

.toggleSwitch input:checked~span span:last-of-type {
    color: #212121;
}
</style>