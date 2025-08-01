"use client"
import React, { useState } from 'react'
import styles from './contact.module.css'
import Button from '../../components/button/button'
import { PhoneIcon, EmailIcon, LocationIcon, ClockIcon, CheckCircleIcon, SendIcon } from '../../components/icons/icons'

export default function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        entreprise: '',
        message: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
    }

    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                {/* Main Heading */}
                <div className={styles.headingSection}>
                    <h2 className={styles.mainHeading}>
                        Prêt à transformer votre gestion énergétique ?
                    </h2>
                    <p className={styles.description}>
                        Multisites, gros volumes, enjeux stratégiques ? Bénéficiez d'un conseiller dédié pour piloter votre stratégie d'achat énergétique de A à Z.
                    </p>
                </div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Left Column - Contact Info & Guarantees */}
                    <div className={styles.leftColumn}>
                        {/* Contact Info Card */}
                        <div className={styles.contactCard}>
                            <h3 className={styles.cardTitle}>Contactez-nous directement</h3>
                            
                            <div className={styles.contactGrid}>
                                <div className={styles.contactItem}>
                                    <div className={styles.contactIconWrapper}>
                                        <PhoneIcon />
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h4 className={styles.contactLabel}>Téléphone</h4>
                                        <p className={styles.contactValue}>+33 1 23 45 67 89</p>
                                        <p className={styles.contactSubtext}>Disponible 9h-18h</p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIconWrapper}>
                                        <EmailIcon />
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h4 className={styles.contactLabel}>Email</h4>
                                        <p className={styles.contactValue}>contact@atlas-energies.fr</p>
                                        <p className={styles.contactSubtext}>Réponse sous 2h</p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIconWrapper}>
                                        <LocationIcon />
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h4 className={styles.contactLabel}>Adresse</h4>
                                        <p className={styles.contactValue}>123 Avenue de l'Énergie</p>
                                        <p className={styles.contactSubtext}>75008 Paris</p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIconWrapper}>
                                        <ClockIcon />
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <h4 className={styles.contactLabel}>Horaires</h4>
                                        <p className={styles.contactValue}>Lundi - Vendredi</p>
                                        <p className={styles.contactSubtext}>9h00 - 18h00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guarantees Card */}
                        <div className={styles.guaranteesCard}>
                            <h3 className={styles.cardTitle}>Nos garanties</h3>
                            
                            <div className={styles.guaranteesList}>
                                <div className={styles.guaranteeItem}>
                                    <CheckCircleIcon className={styles.checkIcon} />
                                    <span>Audit gratuit sous 48h</span>
                                </div>
                                <div className={styles.guaranteeItem}>
                                    <CheckCircleIcon className={styles.checkIcon} />
                                    <span>Accompagnement personnalisé</span>
                                </div>
                                <div className={styles.guaranteeItem}>
                                    <CheckCircleIcon className={styles.checkIcon} />
                                    <span>Sans engagement</span>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Section */}
                        <div className={styles.statsSection}>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>48h</div>
                                <div className={styles.statLabel}>Délai d'audit</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>100%</div>
                                <div className={styles.statLabel}>Gratuit</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className={styles.rightColumn}>
                        <div className={styles.formCard}>
                            <h3 className={styles.cardTitle}>Demandez un audit gratuit</h3>
                            
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            Nom <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nom"
                                            className={styles.formInput}
                                            placeholder="Votre nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            Prénom <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="prenom"
                                            className={styles.formInput}
                                            placeholder="Votre prénom"
                                            value={formData.prenom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Email <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.formInput}
                                        placeholder="votre.email@entreprise.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Téléphone <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        className={styles.formInput}
                                        placeholder="+33 1 23 45 67 89"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Entreprise</label>
                                    <input
                                        type="text"
                                        name="entreprise"
                                        className={styles.formInput}
                                        placeholder="Nom de votre entreprise"
                                        value={formData.entreprise}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Message</label>
                                    <textarea
                                        name="message"
                                        className={styles.formTextarea}
                                        placeholder="Décrivez-nous vos besoins énergétiques..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    leftIcon={SendIcon}
                                    className={styles.submitButton}
                                    type="submit"
                                    size="lg"
                                >
                                    Envoyer ma demande
                                </Button>

                                <p className={styles.formDisclaimer}>
                                    * Champs obligatoires. Vos données sont protégées et utilisées uniquement pour vous recontacter.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}