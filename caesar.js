// Part 2: Caesar Cipher in JavaScript

// Exercise 2.1: Complete the Encryption
function caesarEncrypt(text, shift) {
    let result = "";
    
    // Normalize shift to be positive and within 0-25
    // This handles cases where shift is > 26 or negative
    shift = shift % 26;
    if (shift < 0) shift += 26;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Check for uppercase letters (ASCII 65-90)
        if (char >= 'A' && char <= 'Z') {
            let position = char.charCodeAt(0) - 65;
            // Shift position and wrap around using modulo
            let newPosition = (position + shift) % 26;
            // Convert back to character
            result += String.fromCharCode(newPosition + 65);
        } 
        // Check for lowercase letters (ASCII 97-122)
        else if (char >= 'a' && char <= 'z') {
            let position = char.charCodeAt(0) - 97;
            let newPosition = (position + shift) % 26;
            result += String.fromCharCode(newPosition + 97);
        } 
        // Keep other characters (spaces, punctuation, numbers) unchanged
        else {
            result += char;
        }
    }
    return result;
}

// Exercise 2.2: Write Decryption
function caesarDecrypt(text, shift) {
    let result = "";
    
    // Normalize shift
    shift = shift % 26;
    if (shift < 0) shift += 26;
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        // Decrypt Uppercase
        if (char >= 'A' && char <= 'Z') {
            let position = char.charCodeAt(0) - 65;
            // Subtract shift. Add 26 to ensure the result is positive before modulo
            let newPosition = (position - shift + 26) % 26;
            result += String.fromCharCode(newPosition + 65);
        } 
        // Decrypt Lowercase
        else if (char >= 'a' && char <= 'z') {
            let position = char.charCodeAt(0) - 97;
            let newPosition = (position - shift + 26) % 26;
            result += String.fromCharCode(newPosition + 97);
        } 
        // Keep other characters unchanged
        else {
            result += char;
        }
    }
    return result;
}

// Testing the implementation
console.log("--- Caesar Cipher Tests ---");

// Test Case 1: "Hello World" with shift 3
const testText = "Hello World";
const shiftVal = 3;

console.log(`Original Text: "${testText}"`);
console.log(`Shift: ${shiftVal}`);

// Encrypt
const encrypted = caesarEncrypt(testText, shiftVal);
console.log(`Encrypted:     "${encrypted}"`); 
// Expected: "Khoor Zruog"

// Decrypt
const decrypted = caesarDecrypt(encrypted, shiftVal);
console.log(`Decrypted:     "${decrypted}"`);

// Verify
if (decrypted === testText) {
    console.log("\x1b[32m[SUCCESS]\x1b[0m Decryption matches original text!");
} else {
    console.log("\x1b[31m[ERROR]\x1b[0m Decryption mismatch.");
}

// Test Case 2: Wrapping (X, Y, Z -> A, B, C)
console.log("\n--- Edge Case: Wrapping (X, Y, Z) ---");
const wrapText = "XYZ";
console.log(`Encrypting "${wrapText}" with shift 3: "${caesarEncrypt(wrapText, 3)}"`); 
// Expected: "ABC"

// Test Case 3: Lowercase and mixed
console.log("\n--- Mixed Case Test ---");
console.log(`Encrypting "Java Script" with shift 1: "${caesarEncrypt("Java Script", 1)}"`);
