import React from 'react'
import styles from './strategy.module.css'
import Button from '../../components/button/button'
import MarkedText from '../../components/markedText/markedText'
import { OffreIcon, PhoneIcon, ArrowBenIcon, ArrowLongIcon } from '../../components/icons/icons'
import Image from '@/components/image/image'

export default function Strategy() {
    return (
        <section className={styles.strategy}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Content */}
                    <div className={styles.leftContent}>
                        {/* First Section - Time Saving */}
                        <div className={styles.section}>
                            <h2 className={styles.mainHeading}>
                                <MarkedText variant="large">Gagnez du temps !</MarkedText>
                            </h2>

                            <p className={styles.description}>
                                Accédez en quelques clics à des offres négociées parmi les meilleures du marché,
                                grâce à notre comparateur intelligent.
                            </p>

                            <Button
                                variant="primary"
                                leftIcon={OffreIcon}
                                className={styles.ctaButton}
                                size="lg"
                            >
                                Comparez les offres
                            </Button>
                        </div>

                        {/* Second Section - Custom Strategy */}
                        <div className={styles.section}>
                            <h2 className={styles.mainHeading}>
                                Besoin d'une <MarkedText>stratégie d'achat</MarkedText> sur <MarkedText variant="small">mesure ?</MarkedText>
                            </h2>

                            <p className={styles.description}>
                                Multisites, gros volumes, enjeux stratégiques ? Bénéficiez d'un conseiller dédié
                                pour piloter votre stratégie d'achat énergétique de A à Z
                            </p>

                            <div className={styles.buttonGroup}>
                                <Button
                                    variant="none"
                                    rightIcon={ArrowLongIcon}
                                    size="md"
                                >
                                    Voir plus d'informations
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

                    {/* Arrow Icon Between Sections */}
                    <ArrowBenIcon className={styles.arrowIcon} />

                    {/* Right Content - Complete Image */}
                    <div className={styles.rightContent}>
                        <Image
                            src="/imgs/strategy/phone.png"
                            alt="Mobile app with energy comparison, floating icons, and decorative elements"
                            className={styles.strategyImage}
                            sizes={[50]}
                            quality={100}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
