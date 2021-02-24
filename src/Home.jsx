import React, { useState } from 'react';
import Styled from 'styled-components';

// import Node-rsa
import NodeRSA from 'node-rsa';

const Home = () => {

    const [message, setMessage] = useState('');
    const [encryptedValue, setEncryptedValue] = useState('');
    const [decryptedValue, setDecryptedValue] = useState('');
    const [encryptedStatus, setEncryptedStatus] = useState(false);

    // const key = new NodeRSA({ b: 1024 }); //Private and Public key
    
    // let public_key = key.exportKey('public');
    // let private_key = key.exportKey('private');

    // console.log(public_key + '\n' + private_key);

    // Get input Value
    const handleOnChange = (e) => {
        let message = e.target.value;
        setMessage(message);
    }

    let public_key = '-----BEGIN PUBLIC KEY-----'+
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5N4Yfl6bIk0MmuHmbivT9puzX'+
    'IM7XqudItropjzukVVWhK9ZfgGpF0nZofoHa3RPZz4SULzHXsYl07oI/YM6IJ+lW'+
    'EISDGAIARlKGuuzj/Ho1jwgjppPzzmlJKCewf4ypJfDp2Rv7MsnbJrxg7hMwPvTV'+
    '53qd12LBnyhQ7JiEawIDAQAB'+
    '-----END PUBLIC KEY-----';

    let private_key = '-----BEGIN RSA PRIVATE KEY-----'+
    'MIICXAIBAAKBgQC5N4Yfl6bIk0MmuHmbivT9puzXIM7XqudItropjzukVVWhK9Zf'+
    'gGpF0nZofoHa3RPZz4SULzHXsYl07oI/YM6IJ+lWEISDGAIARlKGuuzj/Ho1jwgj'+
    'ppPzzmlJKCewf4ypJfDp2Rv7MsnbJrxg7hMwPvTV53qd12LBnyhQ7JiEawIDAQAB'+
    'AoGACJ6m5U1/e5Iu69xl/HEpGaztFM34El1nyiCG5Ww/EFTQWWHa5jLpvzoePJq2'+
    'nGLxi4920haoMSuYBBMdiKmOsv74p+WOGyueFpywkOzXJex4ltrQtWca4JBuFbzf'+
    'FXaADs1A7o73ZdwBbbrWEWgiYLCxccWsyTl+pYog6gZpDxECQQD9Pa/xipyHWkkt'+
    '/dqFSpAQpgQzqFC/SE/WDcPCRzbn9MxUDWCfAfLdbaEc0xX2MdF6V7HuQLk0bl3t'+
    'TUPjICk9AkEAuzwcc2n55KbbShbC6+760JdQIH0uvk/dcH9DWGDd2ENQtQmodYfq'+
    '1q3VS5CjQBUBLNldy1nhbGh3xiE1C+WuxwJBANPVVykAnuEmKBLdx346GfqjNN6V'+
    'TD5F2eqfhwIrmgU8I/OnYQyBj8uj2eKHvFY95BGn68H1yDbQn6dSO5hxHa0CQCcI'+
    'ximtm2J3Atq0WhjT7shT82mCj58viUvtzD19nGJ8zjOf+tXd6zCsdv5U/iPa/S67'+
    'dllxuJRgRzAwNh3v2XsCQAW7BBgYT2Sk27TAk9crW2/VwONA+MILLyyudK1FJAbx'+
    'm7TWq23MCpUaI7hgVqkZKceA0tiaC/4T2QeNwA39+y8='+
    '-----END RSA PRIVATE KEY-----';

    let key_private = new NodeRSA(private_key);
    let key_public = new NodeRSA(public_key);

    // Encrypt Your Message
    const handleEncrypt = () => {
        if (message !== '') {
            // Use Public key for encryption
            let encryptedSrting = key_public.encrypt(message);
            setEncryptedValue(encryptedSrting);
            setEncryptedStatus(true);
        }
    }

    const handleDecrypt = () => {
        // Use Private key for decryption
        let decryptedString = key_private.decrypt(encryptedValue, 'utf8');
        setDecryptedValue(decryptedString);
    }

    return (
        <HomeStyle>
            <div className="container">
                <div className="flexContainer">
                    <h1>RSA Encryption By <span>Group 6</span> </h1>
                    <div className="inputGroup">
                        <label htmlFor="">Encrypt Message</label>
                        <textarea onChange={handleOnChange} value={message}></textarea>
                    </div>
                    <button disabled={encryptedStatus} onClick={handleEncrypt}>Encrypt</button>
                    {encryptedStatus &&
                        <div className="output">
                        {encryptedValue}
                        <button onClick={handleDecrypt} className='decryptBtn'>Decrypt</button>
                        <hr />
                        <p>{decryptedValue}</p>
                    </div>
                    }
                </div>
                
            </div>
        </HomeStyle>
    )
}

export default Home;

const HomeStyle = Styled.div`
    width: 100%;
    min-height: 100vh;

    .container {
        display: flex;
        width: 90%;
        max-width: 600px;
        height: 100%;
        margin: 0 auto;

        .flexContainer {
            width: 100%;
        }

        h1 {
            font-size: 2.4rem;
            font-weight: 700;
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            padding: 3rem 0;

            span {
                color: #32E0C4;
            }
        }

        .inputGroup {
            width: 100%;

            label {
                font-size: 1rem;
                font-weight: bold;
                font-family: 'Poppins', sans-serif;
                color: #A7A7A7;
            }

            textarea {
                width: 100%;
                min-height: 100px;
                background: transparent;
                color: #111;
                border: none;
                outline: none;
                padding: 1rem;
                box-sizing: border-box;
                border-bottom: 2px solid #a7a7a7;
                color: #eee;
            }

        }

        button {
            padding: 12px 1.5rem;
            margin-top: 1.4rem;
            background: #32E0C4;
            color: #2D3446;
            cursor: pointer;
            border: none;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            outline: none;
            transition: all .3s ease-in;

            &:hover {
                transform: scale(1.05);
            }
        }

        .output {
            width: 100%;
            min-height: 100px;
            background: #eee;
            word-wrap: break-word;
            padding: 1rem;
            margin-top: 1.4rem;
            border-top: 6px solid #32E0C4;
            box-sizing: border-box;

            .decryptBtn {
                display: block;
                padding: 12px 1.4rem;
                background: #32E0C4;
                color: #2D3446;
                outline: none;
            }

            hr {
                margin: 1rem 0;
            }
        }
    }
`;