<?php get_header(); ?>

<main id="primary" class="site-main">
    <section class="error-404 not-found">
        <header class="page-header">
            <div class="wrapper">
                <h1 class="page-title"><?php esc_html_e( 'Oops! That page can’t be found.', 'reqruitment-task' ); ?></h1>
            </div>
        </header><!-- .page-header -->

        <div class="page-content">
            <div class="wrapper">
                <p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try a search?', 'reqruitment-task' ); ?></p>
                <?php get_search_form(); ?>
            </div>
        </div><!-- .page-content -->
    </section><!-- .error-404 -->
</main><!-- #primary -->

<?php get_footer(); ?>