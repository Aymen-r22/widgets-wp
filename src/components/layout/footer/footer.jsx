"use client";

import React, { useState } from 'react'
import styles from './footer.module.css'
import { LogoIcon, LogoTextIcon, PhoneIcon, EmailIcon, LocationIcon, SendIcon } from '../../icons/icons'

export default function Footer() {
    const [email, setEmail] = useState('')

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        // Handle newsletter submission
        console.log('Newsletter signup:', email)
        setEmail('')
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Main Footer Content */}
                <div className={styles.mainContent}>
                    {/* Company Info & Newsletter */}
                    <div className={styles.companySection}>
                        {/* Logo */}
                        <div className={styles.logoContainer}>
                            <LogoIcon className={styles.logoIcon} />
                            <LogoTextIcon className={styles.logoText} />
                        </div>

                        {/* Description */}
                        <p className={styles.description}>
                            Votre partenaire de confiance pour optimiser votre stratégie énergétique 
                            et réduire durablement vos factures d'énergie.
                        </p>

                        {/* Newsletter */}
                        <div className={styles.newsletter}>
                            <h4 className={styles.sectionTitle}>Restez informé</h4>
                            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.emailInput}
                                    required
                                />
                                <button type="submit" className={styles.submitButton}>
                                    <SendIcon className={styles.sendIcon} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>Solutions</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#" className={styles.link}>Comparateur d'offres</a></li>
                            <li><a href="#" className={styles.link}>Audit énergétique</a></li>
                            <li><a href="#" className={styles.link}>Accompagnement expert</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>Support</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#" className={styles.link}>Politique de cookies</a></li>
                            <li><a href="#" className={styles.link}>Politique de confidentialité</a></li>
                            <li><a href="#" className={styles.link}>Mentions légales</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.contactSection}>
                        <h4 className={styles.sectionTitle}>Contact</h4>
                        <div className={styles.contactList}>
                            <a href="tel:+33123456789" className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.phoneIcon}`}>
                                    <PhoneIcon />
                                </div>
                                <span className={styles.contactText}>+33 1 23 45 67 89</span>
                            </a>
                            <a href="mailto:contact@atlas-energies.fr" className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.emailIconBg}`}>
                                    <EmailIcon />
                                </div>
                                <span className={styles.contactText}>contact@atlas-energies.fr</span>
                            </a>
                            <a href="https://maps.google.com/?q=Paris,France" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                                <div className={`${styles.contactIcon} ${styles.locationIcon}`}>
                                    <LocationIcon />
                                </div>
                                <span className={styles.contactText}>Paris, France</span>
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className={styles.socialSection}>
                            <h4 className={styles.sectionTitle}>Suivez-nous</h4>
                            <div className={styles.socialLinks}>
                                <a href="#" className={styles.socialLink}>Li</a>
                                <a href="#" className={styles.socialLink}>Tw</a>
                                <a href="#" className={styles.socialLink}>Fb</a>
                                <a href="#" className={styles.socialLink}>In</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={styles.footerBottom}>
                    <div className={styles.copyright}>
                        <span>© 2025 Atlas Energies. Tous droits réservés.</span>
                    </div>
                    <div className={styles.bottomLinks}>
                        <a href="#" className={styles.bottomLink}>Mentions légales</a>
                        <a href="#" className={styles.bottomLink}>Politique de confidentialité</a>
                        <a href="#" className={styles.bottomLink}>Conditions d'utilisation</a>
                        <a href="#" className={styles.bottomLink}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
