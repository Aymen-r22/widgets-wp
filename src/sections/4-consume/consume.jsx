import React from 'react'
import styles from './consume.module.css'
import Button from '../../components/button/button'
import MarkedText from '../../components/markedText/markedText'
import Image from '../../components/image/image'
import { PhoneIcon, ArrowLongIcon, AuditIcon } from '../../components/icons/icons'

export default function Consume() {
    return (
        <section className={styles.consume}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Section - Single Image */}
                        <Image
                            src="/imgs/consume/mockup-dashboard.png"
                            alt="Dashboard analytics mockup with background elements"
                            className={styles.dashboardImage}
                            sizes="50"
                        />

                    {/* Right Section - Content */}
                    <div className={styles.rightContent}>
                        <div className={styles.textContent}>
                            {/* Main Heading */}
                            <h2 className={styles.mainHeading}>
                                <MarkedText variant="default">Mieux consommer</MarkedText><br />
                                n'a jamais été<br />
                                si simple !
                            </h2>

                            {/* Subheading */}
                            <h3 className={styles.subHeading}>
                                <MarkedText variant="default">On audite</MarkedText>, <MarkedText variant="default">On solutionne</MarkedText>, <MarkedText variant="default">On réalise</MarkedText>.
                            </h3>

                            {/* Description */}
                            <p className={styles.description}>
                                Bénéficiez d'un audit complet et gratuit sous 48h, nos équipes s'engagent à revenir vers
                                vous avec des solutions d'optimisation concrètes pour réduire vos consommations.
                            </p>

                            {/* Buttons */}
                            <div className={styles.buttonGroup}>
                                <Button
                                    variant="none"
                                    rightIcon={ArrowLongIcon}
                                    className={styles.infoButton}
                                    size="md"
                                >
                                    Voir plus d'informations
                                </Button>

                                <div className={styles.actionButtons}>
                                    <Button
                                        variant="primary"
                                        leftIcon={AuditIcon}
                                        size="md"
                                    >
                                        Faire un audit gratuit
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        leftIcon={PhoneIcon}
                                        size="md"
                                    >
                                        Contactez un expert
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
