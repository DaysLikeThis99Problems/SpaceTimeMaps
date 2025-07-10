step-1
use command:
 python export.py --output-name pune --center '40.75829440050091' '-73.91915960717802' --zoom 12 --grid-size 19  --travel-mode TRANSIT

step-2:
now add in cityData.ts
  tokyo_transit: {
    displayName: "Tokyo",
    maxTimeness: 0.2,
    mode: "public transport",
  },