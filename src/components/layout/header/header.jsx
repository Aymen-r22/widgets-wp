import React from 'react'
import Link from 'next/link'
import styles from './header.module.css'
import Button from '../../button/button'
import { LogoIcon, LogoTextIcon, ArrowLongIcon, GreenDotIcon } from '../../icons/icons'

const RightIcon = () => {
    return (
        <div className={styles.rightIconContainer}>
            <ArrowLongIcon />
        </div>
    )
}
export default function Header({ pages = [] }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Logo Section */}
                <Link href="/" className={styles.logoContainer}>
                    <LogoIcon className={styles.logoIcon} />
                    <LogoTextIcon className={styles.logoText} />
                </Link>

                {/* Navigation Menu - Dynamic from WordPress pages */}
                <div className={styles.navMenu}>
                    {pages.length > 0 ? (
                        pages.slice(0, 6).map((page) => (
                            <Link
                                key={page.id}
                                href={`/${page.slug}`}
                                className={styles.navLink}
                            >
                                {page.title.rendered}
                            </Link>
                        ))
                    ) : (
                        // Fallback static menu
                        <>
                            <a href="#" className={styles.navLink}>Mieux acheter</a>
                            <a href="#" className={styles.navLink}>Mieux consommer</a>
                            <a href="#" className={styles.navLink}>Mieux Gérer</a>
                            <a href="#" className={`${styles.navLink} ${styles.navLinkDisabled}`}>Presse</a>
                        </>
                    )}
                </div>

                {/* Contact Button */}
                <Button
                    variant="secondary"
                    size='lg'
                    leftIcon={GreenDotIcon}
                    rightIcon={RightIcon}
                    className={styles.contactButton}
                    leftIconClassName={styles.contactButtonLeftIcon}
                    rightIconClassName={styles.contactButtonIcon}
                    textClassName={styles.contactButtonText}
                >
                    Contactez-nous
                </Button>
            </nav>
        </header>
    )
}
