const districtList = [
        {
            "transform": "matrix(1 0 0 1 166.0027 234.1553)",
            "name": "Naogaon"
        },
        {
            "transform": "matrix(1 0 0 1 162.2664 134.5146)",
            "name": "Dinajpur"
        },
        {
            "transform": "matrix(1 0 0 1 287.0129 129.3545)",
            "name": "Kurigram"
        },
        {
            "transform": "matrix(1 0 0 1 237.3079 141.8291)",
            "name": "Rangpur"
        },
        {
            "transform": "matrix(1 0 0 1 214.9441 210.5186)",
            "name": "Joypurhat"
        },
        {
            "transform": "matrix(1 0 0 1 259.8748 197.4229)",
            "name": "Gaibandha"
        },
        {
            "transform": "matrix(1 0 0 1 108.4402 265.8604)",
            "name": "Chapai"
        },
        {
            "transform": "matrix(1 0 0 1 157.759 291.2627)",
            "name": "Rajshahi"
        },
        {
            "transform": "matrix(1 0 0 1 255.1047 250.6318)",
            "name": "Bogura"
        },
        {
            "transform": "matrix(1 0 0 1 309.8499 242.9053)",
            "name": "Jamalpur"
        },
        {
            "transform": "matrix(1 0 0 1 336.4578 214.5654)",
            "name": "Sherpur"
        },
        {
            "transform": "matrix(1 0 0 1 366.304 274.9229)",
            "name": "Mymensingh"
        },
        {
            "transform": "matrix(1 0 0 1 380.1184 340.0986)",
            "name": "Gazipur"
        },
        {
            "transform": "matrix(1 0 0 1 325.4617 313.2549)",
            "name": "Tangail"
        },
        {
            "transform": "matrix(1 0 0 1 413.0032 235.4307)",
            "name": "Netrokona"
        },
        {
            "transform": "matrix(1 0 0 1 432.2825 306.5225)",
            "name": "Kishoreganj"
        },
        {
            "transform": "matrix(1 0 0 1 544.0344 294.7197)",
            "name": "Moulvibazar"
        },
        {
            "transform": "matrix(1 0 0 1 558.3704 233.7568)",
            "name": "Sylhet"
        },
        {
            "transform": "matrix(1 0 0 1 477.9709 226.0264)",
            "name": "Sunamganj"
        },
        {
            "transform": "matrix(1 0 0 1 269.0574 302.0303)",
            "name": "Sirajganj"
        },
        {
            "transform": "matrix(1 0 0 1 419.6536 353.7256)",
            "name": "Narsingdi"
        },
        {
            "transform": "matrix(1 0 0 1 461.1497 369.8154)",
            "name": "Brahmanbaria"
        },
        {
            "transform": "matrix(1 0 0 1 493.2288 317.8838)",
            "name": "Habiganj"
        },
        {
            "transform": "matrix(1 0 0 1 444.8616 417.8643)",
            "name": "Comilla"
        },
        {
            "transform": "matrix(1 0 0 1 372.2708 420.2959)",
            "name": "Munshiganj"
        },
        {
            "transform": "matrix(1 0 0 1 311.2961 375.8232)",
            "name": "Manikganj"
        },
        {
            "transform": "matrix(1 0 0 1 371.8899 377.7217)",
            "name": "Dhaka"
        },
        {
            "transform": "matrix(1 0 0 1 405.8098 393.2744)",
            "name": "Narayanganj"
        },
        {
            "transform": "matrix(1 0 0 1 223.009 309.1475)",
            "name": "Natore"
        },
        {
            "transform": "matrix(1 0 0 1 253.6458 351.501)",
            "name": "Pabna"
        },
        {
            "transform": "matrix(1 0 0 1 421.9495 463.5088)",
            "name": "Chandpur"
        },
        {
            "transform": "matrix(1 0 0 1 437.679 502.2275)",
            "name": "Lakshmipur"
        },
        {
            "transform": "matrix(1 0 0 1 461.3459 521.9072)",
            "name": "Noakhali"
        },
        {
            "transform": "matrix(1 0 0 1 302.2747 429.4912)",
            "name": "Faridpur"
        },
        {
            "transform": "matrix(1 0 0 1 314.0393 481.3643)",
            "name": "Gopalganj"
        },
        {
            "transform": "matrix(1 0 0 1 365.4114 453.3506)",
            "name": "Shariatpur"
        },
        {
            "transform": "matrix(1 0 0 1 287.6897 572.7012)",
            "name": "Bagerhat"
        },
        {
            "transform": "matrix(1 0 0 1 314.4836 551.5361)",
            "name": "Pirojpur"
        },
        {
            "transform": "matrix(1 0 0 1 367.1184 580.1279)",
            "name": "Patuakhali"
        },
        {
            "transform": "matrix(1 0 0 1 345.1458 599.9697)",
            "name": "Barguna"
        },
        {
            "transform": "matrix(1 0 0 1 425.0159 554.2217)",
            "name": "Bhola"
        },
        {
            "transform": "matrix(1 0 0 1 157.7249 390.042)",
            "name": "Meherpur"
        },
        {
            "transform": "matrix(1 0 0 1 272.2078 396.1826)",
            "name": "Rajbari"
        },
        {
            "transform": "matrix(1 0 0 1 215.4109 426.3311)",
            "name": "Jhenaidah"
        },
        {
            "transform": "matrix(1 0 0 1 260.8875 439.1162)",
            "name": "Magura"
        },
        {
            "transform": "matrix(1 0 0 1 183.0945 411.1006)",
            "name": "Chuadanga"
        },
        {
            "transform": "matrix(1 0 0 1 217.5291 483.4033)",
            "name": "Jeshore"
        },
        {
            "transform": "matrix(1 0 0 1 276.9182 474.9873)",
            "name": "Narail"
        },
        {
            "transform": "matrix(1 0 0 1 223.4543 575.6357)",
            "name": "Satkhira"
        },
        {
            "transform": "matrix(1 0 0 1 257.0203 549.9346)",
            "name": "Khulna"
        },
        {
            "transform": "matrix(1 0 0 1 561.3352 466.7861)",
            "name": "Khagrachhari"
        },
        {
            "transform": "matrix(1 0 0 1 504.927 492.8701)",
            "name": "Feni"
        },
        {
            "transform": "matrix(1 0 0 1 608.3469 631.4092)",
            "name": "Bandarban"
        },
        {
            "transform": "matrix(1 0 0 1 550.636 670.4268)",
            "name": "Coxsbazar"
        },
        {
            "transform": "matrix(1 0 0 1 355.9583 509.9111)",
            "name": "Barisal"
        },
        {
            "transform": "matrix(1 0 0 1 338.9309 467.0225)",
            "name": "Madaripur"
        },
        {
            "transform": "matrix(1 0 0 1 124.2581 99.8154)",
            "name": "Thakurgaon"
        },
        {
            "transform": "matrix(1 0 0 1 195.0081 100.0674)",
            "name": "Nilphamari"
        },
        {
            "transform": "matrix(1 0 0 1 151.384 58.2783)",
            "name": "Panchagarh"
        },
        {
            "transform": "matrix(1 0 0 1 239.1746 87.6709)",
            "name": "Lalmonirhat"
        },
        {
            "transform": "matrix(1 0 0 1 527.8684 558.7705)",
            "name": "Chattogram"
        },
        {
            "transform": "matrix(1 0 0 1 588.0559 526.2705)",
            "name": "Rangamati"
        },
        {
            "transform": "matrix(1 0 0 1 338.2571 536.7949)",
            "name": "Jhalakathi"
        },
        {
            "transform": "matrix(1 0 0 1 216.4749 378.3193)",
            "name": "Kushtia"
        }
    ]

    export default districtList