<template>
  <div class="relative w-full h-full">

    <svg class="pl-10 h-full w-full" width="1747" height="1069" viewBox="0 0 1747 1069" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="615" y="262" width="1122" height="797" rx="10" fill="#DDDDDD" stroke="#393939" stroke-width="20"/>
        <rect x="10.028" y="10.7742" width="326.854" height="577.452" rx="20" fill="#DDDDDD" stroke="#393939" stroke-width="20"/>
        
        <rect x="136" y="45" width="73" height="73" rx="15" fill="white"/>
        <rect x="1478" y="300" width="215" height="162" rx="15" fill="white"/>
        <rect x="656" y="300" width="491" height="162" rx="15" fill="white"/>
        <rect v-motion
            :initial="{
                opacity: 0,
                x: -50,
            }"
            :enter="{
                x: 0,
                opacity: 100,
                transition: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    repeatDelay: 5000,
                    duration: 3000,
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        repeatDelay: 7500,
                        duration: 500,
                    },
                }
            }" 
            x="656" y="491" width="491" height="530" rx="15" fill="white"/>


        <rect x="1205" y="491" width="491" height="153" rx="15" fill="white"/>

        <rect v-motion
            :initial="{
                opacity: 0,
                y: 50,
            }"
            :enter="{
                y: 0,
                opacity: 100,
                transition: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    repeatDelay: 5000,
                    duration: 3000,
                    y: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        repeatDelay: 7500,
                        duration: 500,
                    },
                }
            }"  x="1205" y="673" width="491" height="348" rx="15" fill="white"/>

        <rect x="136" y="45" width="73" height="73" rx="15" fill="white"/>

        <rect x="42" y="45" width="73" height="73" rx="15" fill="white"/>
        <rect x="230" y="45" width="73" height="73" rx="15" fill="white"/>
        <rect x="42" y="139" width="73" height="73" rx="15" fill="#FF4343"/>
        <rect v-motion
        :delay="100"
        :initial="{
            opacity: 0
        }"
        :enter="{
            opacity: 100,
            transition: {
                repeat: Infinity,
                repeatDelay: 1000,
                repeatType: 'reverse',
                duration: 3000,
            },
        }" 
        x="136" y="139" width="73" height="73" rx="15" fill="#5297FF"/>
        <rect  
            v-motion
            :delay="200"
            :initial="{
                opacity: 0
            }"
            :enter="{
                opacity: 100,
                transition: {
                    repeat: Infinity,
                    repeatDelay: 1000,
                    repeatType: 'reverse',
                    duration: 3000,
                },
            }"
            x="230" y="139" width="73" height="73" rx="15" fill="#64CA4B"/>
        <rect 
            :delay="300"
            v-motion
            :initial="{
                opacity: 0
            }"
            :enter="{
                opacity: 100,
                transition: {
                    repeat: Infinity,
                    repeatDelay: 1000,
                    repeatType: 'reverse',
                    duration: 3000,
                },
            }"
            x="42" y="227" width="73" height="73" rx="15" fill="#F5DB50"/>
    
        <rect 
            v-motion
            :initial="{
                opacity: 0,
            }"
            :enter="{
                opacity: 100,
                transition: {
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 5000,
                duration: 3000,
            },
  }"
            x="1205" y="300" width="215" height="162" rx="15" fill="white"/>

        <!-- Refresh Icon -->
        <path
            v-motion
            :initial="{
                y: -760,
                x: 270,
                
            }"
            :enter="{
                y: 0,
                x: 0,
                transition: {
                    repeat: Infinity,
                    repeatDelay: 1000,
                    repeatType: 'reverse',
                    duration: 3000,
                },
            }" d="M1426.56 964.561L1421.15 978.103L1415.73 963.207L1410.31 948.311L1440.11 959.144L1426.56 964.561ZM1426.56 964.561L1440.11 978.103" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1673.75 202H1672V187L1673.75 202ZM1673.75 202C1675.74 197.074 1679.31 192.949 1683.9 190.269C1688.48 187.59 1693.83 186.509 1699.1 187.195C1704.37 187.881 1709.26 190.296 1713.01 194.061C1716.76 197.826 1719.15 202.728 1719.81 208M1673.75 202H1687M1718.26 220H1720V235L1718.26 220ZM1718.26 220C1716.26 224.923 1712.69 229.045 1708.1 231.722C1703.52 234.398 1698.17 235.478 1692.9 234.792C1687.64 234.106 1682.75 231.693 1679 227.931C1675.25 224.169 1672.85 219.269 1672.19 214M1718.26 220H1705" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>