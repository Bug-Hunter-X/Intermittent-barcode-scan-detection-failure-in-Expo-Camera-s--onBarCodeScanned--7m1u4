# Expo Camera `onBarCodeScanned` Intermittency Bug

This repository demonstrates a bug in Expo's Camera API where the `onBarCodeScanned` function does not reliably trigger when barcodes are scanned, particularly under rapid or repeated scan conditions. The `bug.js` file shows the problematic implementation, while `bugSolution.js` offers a potential fix.

## Problem

The `onBarCodeScanned` callback often misses barcode scan events, especially when scanning occurs quickly or multiple times in short succession. This results in an inconsistent and unreliable user experience.

## Solution

The solution involves debouncing the `onBarCodeScanned` function using a timer. This prevents the function from being called multiple times for the same scan, ensuring reliable detection of barcode scans, even in situations of rapid scanning.