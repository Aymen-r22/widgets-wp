import React from 'react'
import styles from './centralize.module.css'
import Button from '../../components/button/button'
import MarkedText from '../../components/markedText/markedText'
import Image from '../../components/image/image'
import { ArrowBenIcon, ArrowLongIcon, PhoneIcon, DemoIcon, TableIcon, AnticipateIcon, SecurityIcon } from '../../components/icons/icons'

export default function Centralize() {
    return (
        <section className={styles.centralize}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Section - Content */}
                    <div className={styles.leftContent}>
                        {/* Main Heading */}
                        <div className={styles.headingSection}>
                            <h2 className={styles.mainHeading}>
                                <MarkedText variant="default">Centralisez</MarkedText> tous vos sites,<br />
                                contrats, factures et échéances<br />
                                <MarkedText variant="default">sur une seule plateforme 360°</MarkedText>
                            </h2>

                            <p className={styles.description}>
                                Renouvellements anticipés, baisses ou hausses de marché, évolutions fiscales :
                                chaque alerte vous permet d'agir au bon moment, de protéger vos budgets et
                                d'optimiser vos contrats, en continu.
                            </p>
                        </div>

                        {/* Features Section */}
                        <div className={styles.featuresSection}>
                            {/* First Row - Dashboard Feature with Arrow */}
                            <div className={styles.firstFeatureRow}>
                                {/* Feature 1 - Dashboard */}
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>
                                        <TableIcon />
                                    </div>
                                    <h3 className={styles.featureTitle}>Tableaux de bord intelligents</h3>
                                    <p className={styles.featureSubtitle}>KPIs clairs et indicateurs de performance</p>
                                    <p className={styles.featureDescription}>
                                        Prenez le contrôle de votre périmètre énergétique grâce à des KPIs clairs
                                        et des tableaux de bord intelligents.
                                    </p>
                                </div>

                                {/* Bent Arrow */}
                                <div className={styles.bentArrow}>
                                    <ArrowBenIcon />
                                </div>
                            </div>

                            {/* Features Row - Side by Side */}
                            <div className={styles.featuresRow}>
                                {/* Feature 2 - Surveillance */}
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>
                                        <SecurityIcon />
                                    </div>
                                    <h3 className={styles.featureTitle}>Surveillance continue</h3>
                                    <p className={styles.featureSubtitle}>Marché et réglementation en temps réel</p>
                                    <p className={styles.featureDescription}>
                                        Notre plateforme surveille le marché, la réglementation et vous alerte en temps réel
                                        de tout ce qui peut impacter vos prix ou générer une opportunité d'optimisation.
                                    </p>
                                </div>

                                {/* Feature 3 - Anticipation */}
                                <div className={styles.feature}>
                                    <div className={styles.featureIcon}>
                                        <AnticipateIcon />
                                    </div>
                                    <h3 className={styles.featureTitle}>Anticipation des échéances</h3>
                                    <p className={styles.featureSubtitle}>Renouvellements et optimisations</p>
                                    <p className={styles.featureDescription}>
                                        Renouvellements anticipés, baisses ou hausses de marché, évolutions fiscales :
                                        chaque alerte vous permet d'agir au bon moment, de protéger vos budgets et d'optimiser
                                        vos contrats, en continu.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons Section */}
                        <div className={styles.buttonsSection} style={{ width: 'fit-content' }}>
                            <Button
                                variant="none"
                                rightIcon={ArrowLongIcon}
                                size="md"
                                style={{ width: '100%' }}
                            >
                                Voir plus d'informations
                            </Button>

                            <div className={styles.actionButtons}>
                                <Button
                                    variant="secondary"
                                    leftIcon={PhoneIcon}
                                    size="md"
                                >
                                    Contactez un expert
                                </Button>

                                <Button
                                    variant="primary"
                                    leftIcon={DemoIcon}
                                    size="md"
                                >
                                    Demandez une démo
                                </Button>
                            </div>
                        </div>


                    </div>

                    {/* Right Section - Dashboard Image */}
                    <div className={styles.rightContent}>
                        <Image
                            src="/imgs/centralize/mockup-dashboard.png"
                            alt="Centralized dashboard showing sites, contracts, and analytics"
                            className={styles.dashboardImage}
                            sizes="50"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
