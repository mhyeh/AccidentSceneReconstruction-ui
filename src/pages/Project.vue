<template>
    <canvas id='container'></canvas>
    <!-- <div>
    </div> -->
</template>

<script>
import * as io from 'socket.io-client';

export default {
    data () {
        return {
            socket: null,
            isMouseDown: false,
            ctx: null,
            image: new Image(1600, 900),
        };
    },
    beforeMount () {
        const self = this;
        this.image.onload = () => {
            if (this.ctx != null) {
                this.ctx.drawImage(this.image, 0, 0);
            }
        };
        fetch(`http://140.118.127.145:3000/${self.$route.params.id}`).then(() => {
            console.log('run');
            self.socket = io.connect('http://140.118.127.145:3001', {
                path: `/${self.$route.params.id}/`,
            });
            self.socket.on('connected', () => {
                self.socket.emit('init', window.innerWidth, window.innerHeight);
            });
            self.socket.on('frame', frame => {
                self.image.src = 'data:image/jpeg;base64,' + frame;
            });
            document.addEventListener('mousedown', self.mouseDown);
            document.addEventListener('mouseup', self.mouseUp);
            document.addEventListener('mousemove', self.mouseMove);
            document.addEventListener('wheel', self.wheel);
        }).catch((e) => {
            console.log(e);
        });
    },
    mounted () {
        const canvas = document.getElementById('container');
        canvas.width = 1600;
        canvas.height = 900;
        this.ctx = canvas.getContext('2d');
    },
    destroyed () {
        this.socket.close();
        document.removeEventListener('mousedown', this.mouseDown);
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('wheel', this.wheel);
    },
    computed: {
        source () {
            return `http://140.118.127.145/${self.$route.params.id}/`;
        }
    },
    methods: {
        mouseDown (e) {
            this.isMouseDown = true;
            if (this.socket != null) {
                this.socket.emit('mouseDown', e.button);
            }
        },
        mouseUp (e) {
            this.isMouseDown = false;
            if (this.socket != null) {
                this.socket.emit('mouseUp', e.button);
            }
        },
        mouseMove (e) {
            if (this.socket != null) {
                this.socket.emit('mouseMove', e.clientX, e.clientY);
            }
        },
        wheel (e) {
            if (this.socket != null) {
                this.socket.emit('wheel', e.deltaY);
            }
        }
    },
};
</script>

<style scoped>
#container {
    height: 100vh;
    width: 100vw;
}
</style>
