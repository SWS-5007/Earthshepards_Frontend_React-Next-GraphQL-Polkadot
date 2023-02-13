'use client'
import styles from './RightIcon.module.scss';
import Image from 'next/image';
import MountainsImage from '../../../public/right-mountains-image.png';
import { useState } from 'react';


const RightIcon = () => {
    const [rightBoxEnabled, setRightBoxEnabled] = useState<boolean>(false)

    const menuEnabling = () => {
        if (rightBoxEnabled === true) {
            setRightBoxEnabled(false);
        }else {
            setRightBoxEnabled(true);
        }
    }
    return(
        <div className={styles.rightIcon} onClick={menuEnabling}>
            <Image src={MountainsImage} alt="Mountains Image"></Image>
        </div>

    )
}

export default RightIcon